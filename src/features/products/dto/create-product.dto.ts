import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BookProperties } from '../types/book-properties.interface';
import { CarProperties } from '../types/car-properties.interface';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  properties?: CarProperties | BookProperties;
}
