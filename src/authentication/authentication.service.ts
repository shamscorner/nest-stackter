import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../features/users/users.service';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from '../database/postgres-error-codes.enum';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);

    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });
      return createdUser;
    } catch (error: any) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtAccessToken(
    userId: number,
    isSecondFactorAuthenticated = false,
  ) {
    const payload: TokenPayload = { userId, isSecondFactorAuthenticated };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.accessTokenSecret'),
      expiresIn: `${this.configService.get('jwt.accessTokenExpirationTime')}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'jwt.accessTokenExpirationTime',
    )}`;
  }

  public getCookieWithJwtRefreshToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.refreshTokenSecret'),
      expiresIn: `${this.configService.get('jwt.refreshTokenExpirationTime')}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'jwt.refreshTokenExpirationTime',
    )}`;
    return {
      cookie,
      token,
    };
  }

  public getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
