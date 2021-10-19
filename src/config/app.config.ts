import { registerAs } from '@nestjs/config';

const appEnv = (env: string): string => {
  if (!['production', 'staging', 'local'].includes(env)) {
    return 'local';
  }
  return env;
};

export default registerAs('app', () => ({
  // API PORT
  port: parseInt(process.env.PORT, 10) || 3000,

  // API URL
  url: process.env.APP_URL || 'localhost',

  // API Environment: local | production | staging
  env: appEnv(process.env.APP_ENV),

  // API debug mode is enable or not: true | false
  debugMode: process.env.APP_DEBUG === 'false' ? false : true,

  // API support email address
  supportEmail: process.env.SUPPORT_EMAIL || 'support@localhost',
}));
