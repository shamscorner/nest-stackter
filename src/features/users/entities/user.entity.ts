import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Address } from './address.entity';
import Post from '../../posts/entities/post.entity';
import { PublicFile } from '../../files/entities/public-file.entity';
import { PrivateFile } from '../../files/entities/private-file.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  @Expose()
  public email: string;

  @Column({ nullable: true })
  public currentHashedRefreshToken?: string;

  @Column()
  @Expose()
  public name: string;

  @Column()
  public password: string;

  @Column({ nullable: true })
  @Expose()
  public phoneNumber?: string;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public address?: Address;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts?: Post[];

  @OneToOne(() => PublicFile, {
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  public avatar?: PublicFile;

  @OneToMany(() => PrivateFile, (file: PrivateFile) => file.owner)
  public files?: PrivateFile[];
}
