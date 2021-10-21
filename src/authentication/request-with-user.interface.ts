import { Request } from 'express';
import { User } from '../features/users/entities/user.entity';

export interface RequestWithUser extends Request {
  user: User;
}
