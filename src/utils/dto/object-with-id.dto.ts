import { IsNumber } from 'class-validator';

export class ObjectWithIdDto {
  @IsNumber()
  id: number;
}
