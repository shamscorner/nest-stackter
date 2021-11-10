import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginatedResultDto } from '../../utils/dto/paginated-result.dto';
import { PaginationDto } from '../../utils/dto/pagination.dto';
import { User } from '../users/entities/user.entity';
import { CreateProductCommand } from './commands/implementations/create-product.command';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { GetProductsQuery } from './queries/implementations/get-products.query';

@Injectable()
export class ProductsService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async create(createProductDto: CreateProductDto, owner: User) {
    return this.commandBus.execute(
      new CreateProductCommand(createProductDto, owner),
    );
  }

  async findAll(
    ownerId: number,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResultDto<Product>> {
    return this.queryBus.execute(new GetProductsQuery(ownerId, paginationDto));
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
