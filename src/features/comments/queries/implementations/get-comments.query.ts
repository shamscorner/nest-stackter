import { PaginationDto } from '../../../../utils/dto/pagination.dto';

export class GetCommentsQuery {
  constructor(
    public readonly postId: number,
    public readonly paginationDto: PaginationDto,
  ) {}
}
