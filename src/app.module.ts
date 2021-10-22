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
import { UsersModule } from './features/users/users.module';
import { PostsModule } from './features/posts/posts.module';
import { CategoriesModule } from './features/categories/categories.module';
import { FilesModule } from './features/files/files.module';
import awsConfig from './config/aws.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validate,
      load: [appConfig, databaseConfig, typeormConfig, awsConfig],
    }),
    DatabaseModule,
    AuthenticationModule,
    UsersModule,
    PostsModule,
    CategoriesModule,
    FilesModule,
  ],
  controllers: [AppController], // todo: remove later
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: ExceptionsLoggerFilter,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ExcludeNullInterceptor,
    // },
    AppService,
  ], // todo: remove later
})
export class AppModule {}
