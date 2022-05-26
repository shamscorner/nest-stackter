import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Permission } from '../types/permission.type';

export class UpdatePermissionsDto {
  @ApiProperty({
    isArray: true,
    enum: Permission,
  })
  @IsEnum(Permission, { each: true })
  @IsNotEmpty()
  permissions: Permission[];
}
