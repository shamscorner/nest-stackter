import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class GetCommentsDto {
  @Type(() => Number)
  @IsOptional()
  postId?: number;
}
