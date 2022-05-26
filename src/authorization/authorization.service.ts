import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../features/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    await this.usersRepository.update(id, updateRoleDto);
  }

  async updatePermission(
    id: number,
    updatePermissionsDto: UpdatePermissionsDto,
  ) {
    await this.usersRepository.update(id, updatePermissionsDto);
  }
}
