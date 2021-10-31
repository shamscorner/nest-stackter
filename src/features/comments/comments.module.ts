import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCommentHandler } from './commands/handlers/create-comment.handler';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { GetCommentsHandler } from './queries/handlers/get-comments.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), CqrsModule],
  controllers: [CommentsController],
  providers: [CommentsService, CreateCommentHandler, GetCommentsHandler],
})
export class CommentsModule {}
