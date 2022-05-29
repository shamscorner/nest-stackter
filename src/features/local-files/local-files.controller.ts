import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { LocalFilesService } from './local-files.service';

@Controller('local-files')
export class LocalFilesController {
  constructor(private readonly localFilesService: LocalFilesService) {}

  @Get(':id')
  async getDatabaseFileById(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = await this.localFilesService.getFileById(id);

    const stream = createReadStream(join(process.cwd(), file.path));

    response.set({
      'Content-Disposition': `inline; filename="${file.filename}"`,
      'Content-Type': file.mimetype,
    });

    return new StreamableFile(stream);
  }
}
