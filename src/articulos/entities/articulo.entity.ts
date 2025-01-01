import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('articulosinter')
export class Articulo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  categoria: string;

  @ManyToOne(() => User, (user) => user.articulos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userEmail' }) 
  user: User;

  @CreateDateColumn()
  fecha: Date;

  @Column()
  estado: string;

  @Column()
  imagen: string;
}
