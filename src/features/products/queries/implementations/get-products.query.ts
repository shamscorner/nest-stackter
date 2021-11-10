import { PaginationDto } from '../../../../utils/dto/pagination.dto';

export class GetProductsQuery {
  constructor(
    public readonly ownerId: number,
    public readonly paginationDto: PaginationDto,
  ) {}
}
