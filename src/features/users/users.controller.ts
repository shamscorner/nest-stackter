import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RequestWithUser } from '../../authentication/request-with-user.interface';
import { UsersService } from './users.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthenticationGuard } from '../../authentication/jwt-authentication.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.getByEmail(email);
  }

  @Post('avatar')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file'))
  addAvatar(
    @Req() request: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.addAvatar(
      request.user.id,
      file.buffer,
      file.originalname,
    );
  }

  @Delete('avatar')
  @UseGuards(JwtAuthenticationGuard)
  deleteAvatar(@Req() request: RequestWithUser) {
    return this.usersService.deleteAvatar(request.user.id);
  }
}
