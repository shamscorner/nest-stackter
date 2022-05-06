import { ApiProperty } from '@nestjs/swagger';

export class FileUploadMultipleDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}
