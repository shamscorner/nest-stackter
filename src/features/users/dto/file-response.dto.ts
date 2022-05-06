import { IsString, IsNumber } from 'class-validator';
import { User } from '../entities/user.entity';

export class FileResponseDto {
  @IsString()
  public url: string;

  @IsNumber()
  public id: number;

  @IsString()
  public key: string;

  public owner: User;
}
