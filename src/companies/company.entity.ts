import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from '../users/user.entity';
import { Automobile } from '../automobiles/automobile.entity';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cnpj: string;

  @Column()
  endereco: string;

  @Column()
  telefone: string;

  @Column()
  qtd_motos: number;

  @Column()
  qtd_carros: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user: User) => user.company)
  public user: User;

  @OneToMany(type => Automobile, automobile => automobile.company, { cascade: ['remove'] })
  public automobiles: Automobile[]
}
