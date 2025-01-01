import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { Favorito } from 'src/favorito/entities/favorito.entity';

@Entity('articulosinter')
export class Articulo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.articulos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Category, (categoria) => categoria.articulos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Category;

  @Column()
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @CreateDateColumn()
  fecha: Date;

  @Column()
  estado: string;

  @Column({ nullable: true })
  imagen: string;

  @OneToMany(() => Favorito, (favorito) => favorito.articulo)
  favoritos: Favorito[];
}
