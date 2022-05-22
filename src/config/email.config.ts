import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
  port: process.env.EMAIL_PORT || 2525,
  secure: process.env.EMAIL_IS_SECURE === 'true' ? true : false,
  user: process.env.EMAIL_USER || 'user',
  password: process.env.EMAIL_PASSWORD || 'password',
  from: process.env.EMAIL_FROM || '',
  confirmationLink: process.env.EMAIL_CONFIRMATION_URL || process.env.APP_URL,
}));
