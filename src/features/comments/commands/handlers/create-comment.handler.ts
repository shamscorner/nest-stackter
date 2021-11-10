import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentCommand } from '../implementations/create-comment.command';
import { Comment } from '../../entities/comment.entity';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler
  implements ICommandHandler<CreateCommentCommand>
{
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
  ) {}

  async execute(command: CreateCommentCommand): Promise<Comment> {
    const { comment, author } = command;
    const newComment = await this.commentsRepository.create({
      ...comment,
      author,
    });
    await this.commentsRepository.save(newComment);
    return newComment;
  }
}
