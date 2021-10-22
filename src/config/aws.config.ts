import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  publicBucketName: process.env.AWS_PUBLIC_BUCKET_NAME,
}));
