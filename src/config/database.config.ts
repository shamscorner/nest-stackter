import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  name: process.env.DATABASE_NAME,
  typeorm: {
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'false' ? false : true,
    logging: process.env.TYPEORM_LOGGING === 'true' ? true : false,
  },
}));
