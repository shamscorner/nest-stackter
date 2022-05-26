import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../role.enum';

export class UpdateRoleDto {
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
