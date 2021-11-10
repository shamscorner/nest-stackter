import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Product } from '../../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindProductQuery } from '../implementations/find-product.query';
import { Repository } from 'typeorm';

@QueryHandler(FindProductQuery)
export class FindProductHandler implements IQueryHandler<FindProductQuery> {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}
  execute({ productId }: FindProductQuery): Promise<Product> {
    return this.productsRepository.findOne(productId, {
      relations: ['owner'],
    });
  }
}
