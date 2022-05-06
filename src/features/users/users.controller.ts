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
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FileUploadDto } from './dto/file-upload.dto';
import { User } from './entities/user.entity';
import { FileResponseDto } from './dto/file-response.dto';
import { PublicFile } from '../files/entities/public-file.entity';
import { PrivateFile } from '../files/entities/private-file.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({
    description: 'All the users have been fetched successfully!',
    type: [User],
  })
  findAll() {
    return this.usersService.getAllUsers();
  }

  @Get('files')
  @ApiOkResponse({
    description:
      'All the private files of the user have been fetched successfully!',
    type: [FileResponseDto],
  })
  @UseGuards(JwtAuthenticationGuard)
  async getAllPrivateFiles(@Req() request: RequestWithUser) {
    return this.usersService.getAllPrivateFiles(request.user.id);
  }

  @Get(':email')
  @ApiParam({
    name: 'email',
    required: true,
    description: 'Should be a valid email for the user to fetch',
    type: String,
  })
  @ApiOkResponse({
    description: 'A user with the email has been fetched successfully!',
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'A user with given email does not exist.',
  })
  findOne(@Param('email') email: string) {
    return this.usersService.getByEmail(email);
  }

  @Get('files/:id')
  @ApiOkResponse({
    description: 'A private file of the user has been fetched successfully!',
    type: FileResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'A file with given id does not exist.',
  })
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'A new avatar for the user',
    type: FileUploadDto,
  })
  @ApiCreatedResponse({
    description: 'An avatar of the user has been added successfully!',
    type: PublicFile,
  })
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a new private file for the logged in user',
    type: FileUploadDto,
  })
  @ApiCreatedResponse({
    description: 'A private file for this user has been uploaded successfully!',
    type: PrivateFile,
  })
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
  @ApiOkResponse({
    description: 'Avatar for this user has been deleted successfully!',
  })
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
