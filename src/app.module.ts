import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import typeormConfig, { typeormModuleOptions } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [appConfig, databaseConfig, typeormConfig],
    }),
    TypeOrmModule.forRootAsync(typeormModuleOptions),
  ],
  controllers: [AppController], // todo: remove later
  providers: [AppService], // todo: remove later
})
export class AppModule {}
