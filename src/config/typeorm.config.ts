import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('database.host'),
      port: configService.get('database.port'),
      username: configService.get('database.username'),
      password: configService.get('database.password'),
      database: configService.get('database.name'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: configService.get('typeorm.synchronize'),
      logging: configService.get('typeorm.logging'),
    };
  }
}

export const typeormModuleOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};

export default registerAs('typeorm', () => ({
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'false' ? false : true,
  logging: process.env.TYPEORM_LOGGING === 'true' ? true : false,
}));
