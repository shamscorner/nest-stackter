import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LocalFile {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;
}
