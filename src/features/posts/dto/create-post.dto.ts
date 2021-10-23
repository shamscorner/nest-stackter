import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString({ each: true })
  @IsOptional()
  paragraphs: string[];
}
