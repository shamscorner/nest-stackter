import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginatedResultDto } from '../../../../utils/dto/paginated-result.dto';
import { Product } from '../../entities/product.entity';
import { FindAllProductsQuery } from '../implementations/find-all-products.query';
import { getPaginationProps } from '../../../../utils/get-pagination-props';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

@QueryHandler(FindAllProductsQuery)
export class FindAllProductsHandler
  implements IQueryHandler<FindAllProductsQuery>
{
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async execute({
    ownerId,
    paginationDto,
  }: FindAllProductsQuery): Promise<PaginatedResultDto<Product>> {
    const { page, limit, skippedItems } = getPaginationProps(paginationDto);

    const where: FindManyOptions<Product>['where'] = {};
    if (ownerId) {
      where.owner = {
        id: ownerId,
      };
    }

    const [products, productsCount] =
      await this.productsRepository.findAndCount({
        where,
        relations: ['owner'],
        skip: skippedItems,
        take: limit,
      });

    return {
      totalCount: productsCount,
      page: page,
      limit: limit,
      data: products,
    };
  }
}
