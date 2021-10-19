import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  // API PORT
  port: parseInt(process.env.PORT, 10) || 3000,

  // API URL
  url: process.env.APP_URL || 'localhost',

  // API support email address
  supportEmail: process.env.SUPPORT_EMAIL || 'support@localhost',
}));
