import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../../authentication/dto/register.dto';
import { EmailService } from '../../email/email.service';
import { UsersService } from '../users/users.service';
import { VerificationTokenPayload } from './verification-token-payload.interface';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly usersService: UsersService,
  ) {}

  public sendVerificationLink({ email, name }: RegisterDto) {
    const payload: VerificationTokenPayload = { email };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.verificationTokenSecret'),
      expiresIn: `${this.configService.get(
        'jwt.verificationTokenExpirationTime',
      )}s`,
    });

    const url = `${this.configService.get(
      'email.confirmationLink',
    )}?token=${token}`;

    const text = `Welcome to the application. To confirm the email address, click here:<br><a href="${url}">${url}</a>`;

    return this.emailService.sendMail({
      from: this.configService.get('email.from'),
      to: email,
      subject: 'Email confirmation',
      html: `<h2 style="color:#ff6600;">Hello ${name}!</h2><p>${text}</p>`,
    });
  }

  public async resendConfirmationLink(userId: number) {
    const user = await this.usersService.getById(userId);

    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }

    await this.sendVerificationLink(user);
  }

  public async confirmEmail(email: string) {
    const user = await this.usersService.getByEmail(email);

    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }

    await this.usersService.markEmailAsConfirmed(email);
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('jwt.verificationTokenSecret'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }

      throw new BadRequestException();
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }

      throw new BadRequestException('Bad confirmation token');
    }
  }
}
