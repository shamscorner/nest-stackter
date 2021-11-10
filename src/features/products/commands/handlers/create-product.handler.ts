import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { CreateProductCommand } from '../implementations/create-product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async execute(command: CreateProductCommand): Promise<Product> {
    const { product, owner } = command;
    const newProduct = await this.productsRepository.create({
      ...product,
      owner,
    });
    await this.productsRepository.save(newProduct);
    return newProduct;
  }
}
