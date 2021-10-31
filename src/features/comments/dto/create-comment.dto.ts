import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { ObjectWithIdDto } from '../../../utils/types/object-with-id.dto';
export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @ValidateNested()
  @Type(() => ObjectWithIdDto)
  post: ObjectWithIdDto;
}
