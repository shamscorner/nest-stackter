import {
  Body,
  CacheKey,
  CacheTTL,
  // CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtTwoFactorGuard } from '../../authentication/two-factor/jwt-two-factor.guard';
import { RequestWithUser } from '../../authentication/request-with-user.interface';
import { FindOneParams } from '../../utils/dto/find-one-params.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { HttpCacheInterceptor } from '../../utils/http-cache.interceptor';

@Controller('posts')
@ApiTags('posts')
// @UseInterceptors(CacheInterceptor) // default cache interceptor
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // custom cache interceptor
  @UseInterceptors(HttpCacheInterceptor)
  @CacheKey('GET_POSTS_CACHE_KEY')
  @CacheTTL(120)
  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(Number(id));
  }

  @Get('paragraphs/:paragraph')
  getPostsWithParagraph(@Param() paragraph: string) {
    return this.postsService.getPostsWithParagraph(paragraph);
  }

  @Post()
  @UseGuards(JwtTwoFactorGuard)
  async createPost(
    @Body() post: CreatePostDto,
    @Req() request: RequestWithUser,
  ) {
    return this.postsService.createPost(post, request.user);
  }

  @Patch(':id')
  @UseGuards(JwtTwoFactorGuard)
  async updatePost(
    @Param() { id }: FindOneParams,
    @Body() post: UpdatePostDto,
  ) {
    return this.postsService.updatePost(Number(id), post);
  }

  @Delete(':id')
  @UseGuards(JwtTwoFactorGuard)
  async deletePost(@Param() { id }: FindOneParams) {
    return this.postsService.deletePost(Number(id));
  }
}
