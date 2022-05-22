import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { validate } from './env.validation';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './features/users/users.module';
import { PostsModule } from './features/posts/posts.module';
import { CategoriesModule } from './features/categories/categories.module';
import { FilesModule } from './features/files/files.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import typeormConfig from './config/typeorm.config';
import awsConfig from './config/aws.config';
import jwtConfig from './config/jwt.config';
import emailConfig from './config/email.config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CommentsModule } from './features/comments/comments.module';
import { ProductsModule } from './features/products/products.module';
import { DatabaseFilesModule } from './features/database-files/database-files.module';
import { LocalFilesModule } from './features/local-files/local-files.module';
import { LoggerModule } from './logger/logger.module';
import { LogsMiddleware } from './utils/logs.middleware';
import { HealthModule } from './health/health.module';
import { EmailModule } from './email/email.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailSchedulingModule } from './features/email-scheduling/email-scheduling.module';
import { EmailConfirmationModule } from './features/email-confirmation/email-confirmation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validate,
      load: [
        appConfig,
        databaseConfig,
        typeormConfig,
        awsConfig,
        jwtConfig,
        emailConfig,
      ],
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    AuthenticationModule,
    UsersModule,
    PostsModule,
    CategoriesModule,
    FilesModule,
    CommentsModule,
    ProductsModule,
    DatabaseFilesModule,
    LocalFilesModule,
    LoggerModule,
    HealthModule,
    EmailModule,
    EmailSchedulingModule,
    EmailConfirmationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: ExceptionsLoggerFilter,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ExcludeNullInterceptor,
    // },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
