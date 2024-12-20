import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class userinter {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 500 })
  name: string;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column({ nullable: false })
  password: string;
  @Column()
  isVerified: boolean;
}
