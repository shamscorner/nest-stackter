import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FilesModule } from '../files/files.module';
import { DatabaseFilesModule } from '../database-files/database-files.module';
import { LocalFilesModule } from '../local-files/local-files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    FilesModule,
    DatabaseFilesModule,
    LocalFilesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
