import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DatabaseFile {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public filename: string;

  @Column({
    type: 'bytea',
  })
  public data: Uint8Array;
}
