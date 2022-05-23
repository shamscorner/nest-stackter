import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Address } from './address.entity';
import { Post } from '../../posts/entities/post.entity';
import { PrivateFile } from '../../files/entities/private-file.entity';
import { Product } from '../../products/entities/product.entity';
import { LocalFile } from 'src/features/local-files/entities/local-file.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column({ default: false })
  public isEmailConfirmed?: boolean;

  @Column()
  public name: string;

  @Column({ nullable: true })
  public phoneNumber?: string;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public address?: Address;

  @Column()
  @Exclude()
  public password: string;

  @Column({ nullable: true })
  @Exclude()
  public currentHashedRefreshToken?: string;

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

  @Column({ nullable: true })
  @Exclude()
  public twoFactorAuthenticationSecret?: string;

  @Column({ default: false })
  public isTwoFactorAuthenticationEnabled: boolean;

  @Column({ default: false })
  public isRegisteredWithGoogle?: boolean;
}
