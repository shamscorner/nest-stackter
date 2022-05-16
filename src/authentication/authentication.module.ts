import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../features/users/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { JwtTwoFactorStrategy } from './two-factor/jwt-two-factor.strategy';
import { TwoFactorAuthenticationController } from './two-factor/two-factor-authentication.controller';
import { TwoFactorAuthenticationService } from './two-factor/two-factor-authentication.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: ConfigService.get('jwt.accessTokenSecret'),
        signOptions: {
          expiresIn: `${ConfigService.get('jwt.accessTokenExpirationTime')}s`,
        },
      }),
    }),
  ],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    TwoFactorAuthenticationService,
    JwtTwoFactorStrategy,
  ],
  controllers: [AuthenticationController, TwoFactorAuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
