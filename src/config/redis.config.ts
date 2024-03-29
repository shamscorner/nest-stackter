// import { CacheModuleAsyncOptions } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
// import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
// import * as redisStore from 'cache-manager-redis-store';

//! TODO: breaking changes https://github.com/dabroek/node-cache-manager-redis-store/releases/tag/v3.0.0
// export const cacheModuleOptions: CacheModuleAsyncOptions = {
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: (configService: ConfigService) => ({
//     store: redisStore,
//     host: configService.get('redis.host'),
//     port: configService.get('redis.port'),
//     ttl: 120,
//   }),
// };

export default registerAs('redis', () => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
}));
