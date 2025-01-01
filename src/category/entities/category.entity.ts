import { Articulo } from 'src/articulos/entities/articulo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categoriainter')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column('text')
  descripcion: string;

  @OneToMany(() => Articulo, (articulo) => articulo.categoria)
  articulos: Articulo[];
}


