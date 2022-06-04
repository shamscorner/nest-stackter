import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { validate } from './env.validation';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './features/users/users.module';
import { PostsModule } from './features/posts/posts.module';
import { CategoriesModule } from './features/categories/categories.module';
import { FilesModule } from './features/files/files.module';
import appConfig, { throttleModuleAsyncOptions } from './config/app.config';
import databaseConfig from './config/database.config';
import typeormConfig from './config/typeorm.config';
import awsConfig from './config/aws.config';
import jwtConfig from './config/jwt.config';
import emailConfig from './config/email.config';
import googleConfig from './config/google.config';
import redisConfig from './config/redis.config';
import elasticSearch from './config/elastic-search.config';
import { CommentsModule } from './features/comments/comments.module';
import { ProductsModule } from './features/products/products.module';
import { DatabaseFilesModule } from './features/database-files/database-files.module';
import { LocalFilesModule } from './features/local-files/local-files.module';
import { LoggerModule } from './logger/logger.module';
import { LogsMiddleware } from './utils/logs.middleware';
import { HealthModule } from './health/health.module';
import { EmailModule } from './email/email.module';
import { EmailSchedulingModule } from './features/email-scheduling/email-scheduling.module';
import { EmailConfirmationModule } from './features/email-confirmation/email-confirmation.module';
import { GoogleAuthenticationModule } from './features/google-authentication/google-authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { SearchModule } from './features/search/search.module';
import { bullModuleOptions } from './config/bull.config';
import { OptimizeModule } from './features/optimize/optimize.module';

@Module({
  imports: [
    ThrottlerModule.forRootAsync(throttleModuleAsyncOptions),
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
        googleConfig,
        redisConfig,
        elasticSearch,
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
    GoogleAuthenticationModule,
    AuthorizationModule,
    SearchModule,
    BullModule.forRootAsync(bullModuleOptions),
    OptimizeModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
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
