import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;
}
