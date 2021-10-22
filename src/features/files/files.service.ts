import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublicFile } from './entities/public-file.entity';
import { PrivateFile } from './entities/private-file.entity';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { FileNotFoundException } from './exceptions/file-not-found.exception';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(PublicFile)
    private publicFilesRepository: Repository<PublicFile>,
    @InjectRepository(PrivateFile)
    private privateFilesRepository: Repository<PrivateFile>,
    private readonly configService: ConfigService,
  ) {}

  public async getPrivateFile(fileId: number) {
    const s3 = new S3();
    const fileInfo = await this.privateFilesRepository.findOne(
      { id: fileId },
      { relations: ['owner'] },
    );
    if (fileInfo) {
      const stream = await s3
        .getObject({
          Bucket: this.configService.get('aws.publicBucketName'),
          Key: fileInfo.key,
        })
        .createReadStream();
      return {
        stream,
        info: fileInfo,
      };
    }
    throw new FileNotFoundException(fileId);
  }

  public async generatePresignedUrl(key: string) {
    const s3 = new S3();
    return s3.getSignedUrlPromise('getObject', {
      Bucket: this.configService.get('aws.publicBucketName'),
      Key: key,
    });
  }

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('aws.publicBucketName'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();
    const newFile = this.publicFilesRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    await this.publicFilesRepository.save(newFile);
    return newFile;
  }

  async uploadPrivateFile(
    dataBuffer: Buffer,
    ownerId: number,
    filename: string,
  ) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('aws.publicBucketName'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();
    const newFile = this.privateFilesRepository.create({
      key: uploadResult.Key,
      owner: {
        id: ownerId,
      },
    });
    await this.privateFilesRepository.save(newFile);
    return newFile;
  }

  async deletePublicFile(fileId: number) {
    const s3 = new S3();
    const file = await this.publicFilesRepository.findOne({ id: fileId });
    await s3
      .deleteObject({
        Bucket: this.configService.get('aws.publicBucketName'),
        Key: file.key,
      })
      .promise();
    await this.publicFilesRepository.delete(fileId);
  }

  async deletePrivateFile(fileId: number, ownerId: number) {
    const s3 = new S3();
    const file = await this.privateFilesRepository.findOne(
      {
        id: fileId,
      },
      { relations: ['owner'] },
    );
    if (file) {
      if (file.owner && file.owner.id === ownerId) {
        await s3
          .deleteObject({
            Bucket: this.configService.get('aws.publicBucketName'),
            Key: file.key,
          })
          .promise();
        await this.privateFilesRepository.delete(fileId);
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new FileNotFoundException(fileId);
    }
  }
}
