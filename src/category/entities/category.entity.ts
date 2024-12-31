import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categoriainter')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  descripcion: string;
}
