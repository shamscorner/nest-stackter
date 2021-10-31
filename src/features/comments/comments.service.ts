import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { User } from '../users/entities/user.entity';
import { CreateCommentCommand } from './commands/implementations/create-comment.command';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsQuery } from './queries/implementations/get-comments.query';

@Injectable()
export class CommentsService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async getComments(postId: number) {
    return this.queryBus.execute(new GetCommentsQuery(postId));
  }

  async createComment(comment: CreateCommentDto, author: User) {
    return this.commandBus.execute(new CreateCommentCommand(comment, author));
  }
}
