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

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getComments(@Query() { postId }: GetCommentsDto) {
    return this.commentsService.getComments(postId);
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
