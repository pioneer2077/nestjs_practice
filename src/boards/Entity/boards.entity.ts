import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from '../boards-status.enum';
import { User } from 'src/auth/Entity/user.entity';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;
  // @Column()
  // status: BoardStatus;
  // @Column()
  // name:string

  // @Column()
  // email:string

  // @Column()
  // image:string

  // @Column()
  // following:string

  // @Column()
  // followers:string

  // @Column()
  // bookmarks:string
  @ManyToOne((type) => User, (user) => user.boards, { eager: false })
  user: User;

  @Column()
  userId: number;
}
