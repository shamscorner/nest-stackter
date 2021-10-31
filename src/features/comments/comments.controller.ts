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
import { PaginationDto } from '../../utils/dto/pagination.dto';
import { PaginatedResultDto } from '../../utils/dto/paginated-result.dto';
import { Comment } from './entities/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getComments(
    @Query() { postId }: GetCommentsDto,
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResultDto<Comment>> {
    return this.commentsService.getComments(postId, paginationDto);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createComment(
    @Body() comment: CreateCommentDto,
    @Req() request: RequestWithUser,
  ) {
    const user = request.user;
    return this.commentsService.createComment(comment, user);
  }
}
