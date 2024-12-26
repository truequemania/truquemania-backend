import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('articulosinter')
export class Articulo {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    descripcion: string;
    @Column()
    categoria: string;
    @Column()
    email: string;
    @Column()
    name: string;
    @CreateDateColumn()
    fecha: Date;
    @Column()
    estado: string;
    @Column()
    imagen: string;
}