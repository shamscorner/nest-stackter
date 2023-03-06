import { Module } from '@nestjs/common';
// import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { cacheModuleOptions } from '../../config/redis.config';
import { SearchModule } from '../search/search.module';
import { Post } from './entities/post.entity';
import { PostsSearchService } from './posts-search.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [
    // CacheModule.registerAsync(cacheModuleOptions),
    TypeOrmModule.forFeature([Post]),
    SearchModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsSearchService],
})
export class PostsModule {}
