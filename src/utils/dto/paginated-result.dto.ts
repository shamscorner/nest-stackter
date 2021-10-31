import { IsNumber, ValidateNested } from 'class-validator';

export class PaginatedResultDto<T> {
  @ValidateNested()
  data: T[];

  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;

  @IsNumber()
  totalCount: number;
}
