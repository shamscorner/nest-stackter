import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { GetCommentsQuery } from '../implementations/get-comments.query';
import { Comment } from '../../entities/comment.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { PaginatedResultDto } from '../../../../utils/dto/paginated-result.dto';
import { getPaginationProps } from '../../../../utils/get-pagination-props';

@QueryHandler(GetCommentsQuery)
export class GetCommentsHandler implements IQueryHandler<GetCommentsQuery> {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
  ) {}

  async execute({
    postId,
    paginationDto,
  }: GetCommentsQuery): Promise<PaginatedResultDto<Comment>> {
    const { page, limit, skippedItems } = getPaginationProps(paginationDto);

    const where: FindManyOptions<Comment>['where'] = {};
    if (postId) {
      where.post = {
        id: postId,
      };
    }

    const [comments, commentsCount] =
      await this.commentsRepository.findAndCount({
        where,
        relations: ['author'],
        skip: skippedItems,
        take: limit,
      });

    return {
      totalCount: commentsCount,
      page: page,
      limit: limit,
      data: comments,
    };
  }
}
