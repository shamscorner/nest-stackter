import { InjectQueue } from '@nestjs/bull';
import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Queue } from 'bull';
import { Response } from 'express';
import { Readable } from 'stream';
import { ImagesUploadDto } from './dto/images-upload.dto';

@Controller('optimize')
@ApiTags('optimize')
export class OptimizeController {
  constructor(@InjectQueue('image') private readonly imageQueue: Queue) {}

  @Post('image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload images',
    type: ImagesUploadDto,
  })
  @ApiCreatedResponse({
    description: 'Images have been uploaded successfully!',
  })
  @UseInterceptors(FilesInterceptor('files'))
  async processImage(@UploadedFiles() files: Express.Multer.File[]) {
    const job = await this.imageQueue.add('optimize', {
      files,
    });

    return {
      jobId: job.id,
    };
  }

  @Get('image/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be a valid job id',
    type: String,
  })
  async getJobResult(@Res() response: Response, @Param('id') id: string) {
    const job = await this.imageQueue.getJob(id);

    console.log(job);

    if (!job) {
      return response.sendStatus(404);
    }

    const isCompleted = await job.isCompleted();

    if (!isCompleted) {
      return response.sendStatus(202);
    }

    const result = Buffer.from(job.returnvalue);

    const stream = Readable.from(result);

    stream.pipe(response);
  }
}
