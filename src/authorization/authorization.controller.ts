import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthorizationService } from './authorization.service';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './role.enum';
import { RoleGuard } from './role.guard';

@Controller('authorization')
@ApiTags('authorization')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(RoleGuard(Role.SuperAdmin))
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Patch(':userId/role')
  @HttpCode(204)
  updateRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.authorizationService.updateRole(userId, updateRoleDto);
  }

  @Patch(':userId/permissions')
  @HttpCode(204)
  updatePermission(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updatePermissionsDto: UpdatePermissionsDto,
  ) {
    return this.authorizationService.updatePermission(
      userId,
      updatePermissionsDto,
    );
  }
}
