import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FileNotFoundException } from '../files/exceptions/file-not-found.exception';
import { FilesService } from '../files/files.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import * as bcrypt from 'bcrypt';
import { DatabaseFilesService } from '../database-files/database-files.service';
import { LocalFileDto } from '../local-files/dto/local-file.dto';
import { LocalFilesService } from '../local-files/local-files.service';
import { join } from 'path';
import * as util from 'util';
import * as filesystem from 'fs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly filesService: FilesService,
    private readonly databaseFilesService: DatabaseFilesService,
    private readonly localFilesService: LocalFilesService,
    private dataSource: DataSource,
  ) {}

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getById(userId);
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );
    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: number) {
    return this.usersRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
    return this.usersRepository.update(userId, {
      twoFactorAuthenticationSecret: secret,
    });
  }

  async turnOnTwoFactorAuthentication(userId: number) {
    return this.usersRepository.update(userId, {
      isTwoFactorAuthenticationEnabled: true,
    });
  }

  async turnOffTwoFactorAuthentication(userId: number) {
    return this.usersRepository.update(userId, {
      isTwoFactorAuthenticationEnabled: false,
    });
  }

  async markEmailAsConfirmed(email: string) {
    return this.usersRepository.update(
      { email },
      {
        isEmailConfirmed: true,
      },
    );
  }

  async createWithGoogle(email: string, name: string) {
    const newUser = await this.usersRepository.create({
      email,
      name,
      isRegisteredWithGoogle: true,
    });

    await this.usersRepository.save(newUser);
    return newUser;
  }

  async getAllUsers() {
    const users = await this.usersRepository.find();
    return users;
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (user) {
      return user;
    }
    throw new UserNotFoundException(id);
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  // Upload files to Amazon S3
  async addAvatarUsingAmazonS3(
    userId: number,
    imageBuffer: Buffer,
    filename: string,
  ) {
    const avatar = await this.filesService.uploadPublicFile(
      imageBuffer,
      filename,
    );
    const user = await this.getById(userId);
    await this.usersRepository.update(userId, {
      ...user,
      avatar,
    });
    return avatar;
  }

  // Upload files to Postgres database directly
  async addAvatarInPGsql(
    userId: number,
    imageBuffer: Buffer,
    filename: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(User, {
        where: {
          id: userId,
        },
      });
      const currentAvatarId = user.avatarId;
      const avatar =
        await this.databaseFilesService.uploadDatabaseFileWithQueryRunner(
          imageBuffer,
          filename,
          queryRunner,
        );

      await queryRunner.manager.update(User, userId, {
        avatarId: avatar.id,
      });

      if (currentAvatarId) {
        await this.databaseFilesService.deleteFileWithQueryRunner(
          currentAvatarId,
          queryRunner,
        );
      }

      await queryRunner.commitTransaction();
      return avatar;
    } catch {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  async getAvatar(userId: number) {
    const user = await this.getById(userId);
    const fileId = user.avatarId;
    if (!fileId) {
      throw new NotFoundException();
    }
    const fileMetadata = await this.localFilesService.getFileById(
      user.avatarId,
    );

    const pathOnDisk = join(process.cwd(), fileMetadata.path);

    const file = await util.promisify(filesystem.readFile)(pathOnDisk);

    return {
      file,
      fileMetadata,
    };
  }

  async addAvatar(userId: number, fileData: LocalFileDto) {
    const avatar = await this.localFilesService.saveLocalFileData(fileData);
    await this.usersRepository.update(userId, {
      avatarId: avatar.id,
    });
  }

  async deleteAvatar(userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    const user = await this.getById(userId);
    const fileId = user.avatarId;
    if (fileId) {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        await queryRunner.manager.update(User, userId, {
          ...user,
          avatarId: null,
        });
        await this.localFilesService.deleteLocalFileWithQueryRunner(
          fileId,
          queryRunner,
        );
        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException();
      } finally {
        await queryRunner.release();
      }
    } else {
      throw new FileNotFoundException(fileId);
    }
  }

  async getPrivateFile(userId: number, fileId: number) {
    const file = await this.filesService.getPrivateFile(fileId);
    if (file.info.owner.id === userId) {
      return file;
    }
    throw new UnauthorizedException();
  }

  async getAllPrivateFiles(userId: number) {
    const userWithFiles = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['files'],
    });
    if (userWithFiles) {
      return Promise.all(
        userWithFiles.files.map(async (file) => {
          const url = await this.filesService.generatePresignedUrl(file.key);
          return {
            ...file,
            url,
          };
        }),
      );
    }
    throw new UserNotFoundException(userId);
  }

  async addPrivateFile(userId: number, imageBuffer: Buffer, filename: string) {
    return this.filesService.uploadPrivateFile(imageBuffer, userId, filename);
  }

  async deletePrivateFile(userId: number, fileId: number) {
    await this.filesService.deletePrivateFile(fileId, userId);
  }
}
