import { User } from '../../../users/entities/user.entity';
import { CreateProductDto } from '../../dto/create-product.dto';

export class CreateProductCommand {
  constructor(
    public readonly product: CreateProductDto,
    public readonly owner: User,
  ) {}
}
