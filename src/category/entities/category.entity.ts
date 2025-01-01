import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Articulo } from 'src/articulos/entities/articulo.entity';

@Entity('categoriainter')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @OneToMany(() => Articulo, (articulo) => articulo.categoria)
  articulos: Articulo[];
}
