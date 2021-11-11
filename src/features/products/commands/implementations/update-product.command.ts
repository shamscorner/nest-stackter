import { User } from '../../../users/entities/user.entity';
import { UpdateProductDto } from '../../dto/update-product.dto';

export class UpdateProductCommand {
  constructor(
    public readonly id: string,
    public readonly product: UpdateProductDto,
    public readonly owner: User,
  ) {}
}
