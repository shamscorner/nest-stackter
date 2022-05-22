import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublicFile } from './entities/public-file.entity';
import { PrivateFile } from './entities/private-file.entity';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { FileNotFoundException } from './exceptions/file-not-found.exception';
import internal from 'stream';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(PublicFile)
    private publicFilesRepository: Repository<PublicFile>,
    @InjectRepository(PrivateFile)
    private privateFilesRepository: Repository<PrivateFile>,
    private readonly configService: ConfigService,
  ) {}

  /**
   * @param fileId An id of a file. A file with this id should exist in the database
   * @returns A promise with the file and its information
   */
  public async getPrivateFile(fileId: number): Promise<{
    stream: internal.Readable;
    info: PrivateFile;
  }> {
    const s3 = new S3();
    const fileInfo = await this.privateFilesRepository.findOne({
      where: {
        id: fileId,
      },
      relations: ['owner'],
    });
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

  /**
   * @param key AWS object key
   * @returns A promise with a url
   */
  public async generatePresignedUrl(key: string): Promise<string> {
    const s3 = new S3();
    return s3.getSignedUrlPromise('getObject', {
      Bucket: this.configService.get('aws.publicBucketName'),
      Key: key,
    });
  }

  /**
   * @param dataBuffer The file buffer of the uploaded content
   * @param filename A file name
   * @returns A promise with the public version of the uploaded file
   */
  async uploadPublicFile(
    dataBuffer: Buffer,
    filename: string,
  ): Promise<PublicFile> {
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

  /**
   * @param dataBuffer The file buffer of the uploaded content
   * @param ownerId An id of the user who uploaded the file. A user with this id should exist on the database
   * @param filename A file name
   * @returns A promise with the public version of the uploaded file
   */
  async uploadPrivateFile(
    dataBuffer: Buffer,
    ownerId: number,
    filename: string,
  ): Promise<PrivateFile> {
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

  /**
   * @param fileId An id of a file. A file with this id should exist in the database
   */
  async deletePublicFile(fileId: number): Promise<void> {
    const s3 = new S3();
    const file = await this.publicFilesRepository.findOne({
      where: { id: fileId },
    });
    await s3
      .deleteObject({
        Bucket: this.configService.get('aws.publicBucketName'),
        Key: file.key,
      })
      .promise();
    await this.publicFilesRepository.delete(fileId);
  }

  /**
   * @param fileId An id of a file. A file with this id should exist in the database
   * @param ownerId An id of the user who uploaded the file. A user with this id should exist on the database
   */
  async deletePrivateFile(fileId: number, ownerId: number): Promise<void> {
    const s3 = new S3();
    const file = await this.privateFilesRepository.findOne({
      where: {
        id: fileId,
      },
      relations: ['owner'],
    });
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
