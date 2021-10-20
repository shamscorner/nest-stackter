import { Request } from 'express';
import { User } from 'src/features/users/entities/user.entity';

export interface RequestWithUser extends Request {
  user: User;
}
