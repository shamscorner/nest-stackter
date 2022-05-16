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
import { Post } from '../../posts/entities/post.entity';
import { PrivateFile } from '../../files/entities/private-file.entity';
import { Product } from '../../products/entities/product.entity';
import { LocalFile } from 'src/features/local-files/entities/local-file.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ nullable: true })
  public twoFactorAuthenticationSecret?: string;

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

  // use Amazon S3 to store avatar publicly
  // @OneToOne(() => PublicFile, {
  //   eager: true,
  //   nullable: true,
  // })
  // @JoinColumn()
  // public avatar?: PublicFile;

  // store file directly to postgres database
  // @JoinColumn({ name: 'avatarId' })
  // @OneToOne(() => DatabaseFile, {
  //   nullable: true,
  // })
  // public avatar?: DatabaseFile;

  @JoinColumn({ name: 'avatarId' })
  @OneToOne(() => LocalFile, {
    nullable: true,
  })
  public avatar?: LocalFile;

  // this field is necessary only for storing files to postgres database
  @Column({ nullable: true })
  public avatarId?: number;

  @OneToMany(() => PrivateFile, (file: PrivateFile) => file.owner)
  public files?: PrivateFile[];

  @OneToMany(() => Product, (product: Product) => product.owner)
  public products?: Product[];

  @Column({ default: false })
  public isTwoFactorAuthenticationEnabled: boolean;
}
