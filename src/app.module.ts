import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { validate } from './env.validation';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import typeormConfig from './config/typeorm.config';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validate,
      load: [appConfig, databaseConfig, typeormConfig],
    }),
    DatabaseModule,
    AuthenticationModule,
    UsersModule,
    PostsModule,
    CategoriesModule,
  ],
  controllers: [AppController], // todo: remove later
  providers: [AppService], // todo: remove later
})
export class AppModule {}
