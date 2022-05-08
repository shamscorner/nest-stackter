import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalFile } from './entities/local-file.entity';
import { LocalFilesController } from './local-files.controller';
import { LocalFilesService } from './local-files.service';

@Module({
  imports: [TypeOrmModule.forFeature([LocalFile]), ConfigModule],
  controllers: [LocalFilesController],
  providers: [LocalFilesService],
  exports: [LocalFilesService],
})
export class LocalFilesModule {}
