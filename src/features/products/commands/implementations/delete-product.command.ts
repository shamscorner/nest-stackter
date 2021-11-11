import { User } from '../../../users/entities/user.entity';

export class DeleteProductCommand {
  constructor(public readonly id: string, public readonly owner: User) {}
}
