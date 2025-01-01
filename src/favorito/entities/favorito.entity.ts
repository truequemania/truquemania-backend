import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Articulo } from 'src/articulos/entities/articulo.entity';

@Entity('favoritosinter')
export class Favorito {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favoritos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Articulo, (articulo) => articulo.favoritos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'articulo_id' })
  articulo: Articulo;

  @CreateDateColumn()
  fecha: Date;
}
