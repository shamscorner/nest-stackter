import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginatedResultDto } from '../../../../utils/dto/paginated-result.dto';
import { Product } from '../../entities/product.entity';
import { GetProductsQuery } from '../implementations/get-products.query';
import { getPaginationProps } from '../../../../utils/get-pagination-props';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async execute({
    ownerId,
    paginationDto,
  }: GetProductsQuery): Promise<PaginatedResultDto<Product>> {
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
