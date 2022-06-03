import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';

export class ImagesUploadDto {
  @ApiProperty({
    description: 'Attachments',
    type: 'array',
    items: {
      type: 'file',
      items: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  files: Express.Multer.File[];
}
