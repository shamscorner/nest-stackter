import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookProperties } from '../types/book-properties.interface';
import { CarProperties } from '../types/car-properties.interface';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column({
    type: 'jsonb',
  })
  public properties: CarProperties | BookProperties;

  @ManyToOne(() => User, (owner: User) => owner.products)
  public owner: User;
}
