import { IsString } from 'class-validator';

export class CreateLogDto {
  @IsString()
  context: string;

  @IsString()
  message: string;

  @IsString()
  level: string;
}
