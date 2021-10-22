import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RequestWithUser } from '../../authentication/request-with-user.interface';
import { UsersService } from './users.service';
import { Express, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthenticationGuard } from '../../authentication/jwt-authentication.guard';
import { FindOneParams } from '../../utils/find-one-params';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }

  @Get('files')
  @UseGuards(JwtAuthenticationGuard)
  async getAllPrivateFiles(@Req() request: RequestWithUser) {
    console.log(request.user.id);
    return this.usersService.getAllPrivateFiles(request.user.id);
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.getByEmail(email);
  }

  @Get('files/:id')
  @UseGuards(JwtAuthenticationGuard)
  async getPrivateFile(
    @Req() request: RequestWithUser,
    @Param() { id }: FindOneParams,
    @Res() response: Response,
  ) {
    const file = await this.usersService.getPrivateFile(
      request.user.id,
      Number(id),
    );
    file.stream.pipe(response);
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

  @Post('files')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file'))
  addPrivateFile(
    @Req() request: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.addPrivateFile(
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

  @Delete('files/:id')
  @UseGuards(JwtAuthenticationGuard)
  deletePrivateFile(
    @Req() request: RequestWithUser,
    @Param() { id }: FindOneParams,
  ) {
    return this.usersService.deletePrivateFile(request.user.id, Number(id));
  }
}
