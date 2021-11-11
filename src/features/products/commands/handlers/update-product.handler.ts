import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { FileNotFoundException } from '../../exceptions/file-not-found.exception';
import { UpdateProductCommand } from '../implementations/update-product.command';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async execute(command: UpdateProductCommand): Promise<Product> {
    const { id, product, owner } = command;
    const oldProduct = await this.productsRepository.findOne(id, {
      relations: ['owner'],
    });
    if (oldProduct) {
      if (oldProduct.owner && oldProduct.owner.id === owner.id) {
        await this.productsRepository.update(id, product);
        const updatedProduct = await this.productsRepository.findOne(id, {
          relations: ['owner'],
        });
        if (updatedProduct) {
          return updatedProduct;
        }
      } else {
        throw new UnauthorizedException();
      }
    }
    throw new FileNotFoundException(id);
  }
}
