import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestWithUser } from '../../authentication/request-with-user.interface';
import { JwtAuthenticationGuard } from '../../authentication/jwt-authentication.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsDto } from './dto/get-comments.dto';
import { PaginatedResultDto } from '../../utils/dto/paginated-result.dto';
import { Comment } from './entities/comment.entity';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';

@Controller('comments')
@ApiTags('comments')
@ApiExtraModels(PaginatedResultDto)
@UseGuards(JwtAuthenticationGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getComments(
    @Query() { postId, page = 1, limit = 20 }: GetCommentsDto,
  ): Promise<PaginatedResultDto<Comment>> {
    return this.commentsService.getComments(postId, { page, limit });
  }

  @Post()
  async createComment(
    @Body() comment: CreateCommentDto,
    @Req() request: RequestWithUser,
  ) {
    const user = request.user;
    return this.commentsService.createComment(comment, user);
  }
}
