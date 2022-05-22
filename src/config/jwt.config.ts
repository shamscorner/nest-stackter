import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  accessTokenExpirationTime: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  refreshTokenExpirationTime: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  verificationTokenSecret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
  verificationTokenExpirationTime:
    process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME,
}));
