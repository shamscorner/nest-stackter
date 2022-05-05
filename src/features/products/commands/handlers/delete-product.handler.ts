import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { ProductNotFoundException } from '../../exceptions/file-not-found.exception';
import { DeleteProductCommand } from '../implementations/delete-product.command';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async execute(command: DeleteProductCommand): Promise<void> {
    const { id, owner } = command;
    const oldProduct = await this.productsRepository.findOne({
      where: {
        id,
      },
      relations: ['owner'],
    });
    if (oldProduct) {
      if (oldProduct.owner && oldProduct.owner.id === owner.id) {
        const deleteResponse = await this.productsRepository.delete(id);
        if (!deleteResponse.affected) {
          throw new ProductNotFoundException(id);
        }
        return;
      } else {
        throw new UnauthorizedException();
      }
    }
    throw new ProductNotFoundException(id);
  }
}
