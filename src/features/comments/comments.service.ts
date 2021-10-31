import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginatedResultDto } from '../../utils/dto/paginated-result.dto';
import { PaginationDto } from '../../utils/dto/pagination.dto';
import { User } from '../users/entities/user.entity';
import { CreateCommentCommand } from './commands/implementations/create-comment.command';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsQuery } from './queries/implementations/get-comments.query';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async getComments(
    postId: number,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResultDto<Comment>> {
    return this.queryBus.execute(new GetCommentsQuery(postId, paginationDto));
  }

  async createComment(comment: CreateCommentDto, author: User) {
    return this.commandBus.execute(new CreateCommentCommand(comment, author));
  }
}
