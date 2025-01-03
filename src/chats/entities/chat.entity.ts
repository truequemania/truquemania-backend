import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';


@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  userOne: User;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  userTwo: User;

  @CreateDateColumn()
  createdAt: Date;
}
