import { registerAs } from '@nestjs/config';

export default registerAs('google', () => ({
  auth: {
    clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
  },
}));
