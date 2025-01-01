import { Articulo } from 'src/articulos/entities/articulo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('userinter')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ type: 'enum', enum: ['admin', 'client'], default: 'client' })
    role: string;

    @OneToMany(() => Articulo, (articulo) => articulo.user)
    articulos: Articulo[];
}
