import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import { ThrottlerAsyncOptions } from '@nestjs/throttler';

export const throttleModuleAsyncOptions: ThrottlerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    ttl: configService.get('app.throttle.ttl'),
    limit: configService.get('app.throttle.limit'),
  }),
};

export default registerAs('app', () => ({
  // API PORT
  port: parseInt(process.env.PORT, 10) || 3000,

  // API URL
  url: process.env.APP_URL || 'localhost',

  // API Environment: local | production | staging
  env: process.env.APP_ENV || 'local',

  // API debug mode is enable or not: true | false
  debugMode: process.env.APP_DEBUG === 'false' ? false : true,

  // API support email address
  supportEmail: process.env.SUPPORT_EMAIL || 'support@localhost',

  // throttle configurations
  throttle: {
    ttl: process.env.THROTTLE_TTL || 60000,
    limit: process.env.THROTTLE_LIMIT || 10000,
  },

  // Server file upload destination
  fileDestination: process.env.UPLOADED_FILES_DESTINATION || './uploadedFiles',

  // two factor authentication app name
  twoFactorAuthAppName:
    process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME || 'Nest_Starter_Template',

  // sites that are CORS enabled
  frontendURL: process.env.FRONTEND_URL || 'localhost',
}));
