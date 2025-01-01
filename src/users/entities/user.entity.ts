import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Articulo } from 'src/articulos/entities/articulo.entity';
import { Favorito } from 'src/favorito/entities/favorito.entity';

@Entity('userinter')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ type: 'enum', enum: ['admin', 'client'], default: 'client' })
  role: string;

  @OneToMany(() => Articulo, (articulo) => articulo.user)
  articulos: Articulo[];

  @OneToMany(() => Favorito, (favorito) => favorito.user)
  favoritos: Favorito[];
}
