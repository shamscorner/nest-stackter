import { PaginationDto } from '../../../../utils/dto/pagination.dto';

export class FindAllProductsQuery {
  constructor(
    public readonly ownerId: number,
    public readonly paginationDto: PaginationDto,
  ) {}
}
