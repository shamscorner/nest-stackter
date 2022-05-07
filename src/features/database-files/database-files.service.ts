import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { DatabaseFile } from './entities/database-file.entity';

@Injectable()
export class DatabaseFilesService {
  constructor(
    @InjectRepository(DatabaseFile)
    private databaseFilesRepository: Repository<DatabaseFile>,
  ) {}

  async uploadDatabaseFileWithQueryRunner(
    dataBuffer: Buffer,
    filename: string,
    queryRunner: QueryRunner,
  ) {
    const newFile = await queryRunner.manager.create(DatabaseFile, {
      filename,
      data: dataBuffer,
    });
    await queryRunner.manager.save(DatabaseFile, newFile);
    return newFile;
  }

  async deleteFileWithQueryRunner(fileId: number, queryRunner: QueryRunner) {
    const deleteResponse = await queryRunner.manager.delete(
      DatabaseFile,
      fileId,
    );
    if (!deleteResponse.affected) {
      throw new NotFoundException();
    }
  }

  async getFileById(fileId: number) {
    const file = await this.databaseFilesRepository.findOne({
      where: {
        id: fileId,
      },
    });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}
