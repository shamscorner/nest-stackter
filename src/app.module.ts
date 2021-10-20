import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import typeormConfig from './config/typeorm.config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [appConfig, databaseConfig, typeormConfig],
    }),
    DatabaseModule,
  ],
  controllers: [AppController], // todo: remove later
  providers: [AppService], // todo: remove later
})
export class AppModule {}
