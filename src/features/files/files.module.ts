import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivateFile } from './entities/private-file.entity';
import { PublicFile } from './entities/public-file.entity';
import { FilesService } from './files.service';

@Module({
  imports: [TypeOrmModule.forFeature([PublicFile, PrivateFile])],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
