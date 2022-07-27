import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Company } from '../companies/company.entity';

@Entity()
export class Automobile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  cor: string;

  @Column()
  placa: string;

  @Column()
  tipo: string;

  @Column()
  companyId: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => Company, company => company.automobiles, { cascade: ['insert'], eager: true })
  public company: Company

  async validateTipo(tipo: string): Promise<boolean> {
    return await tipo === 'moto' || tipo === 'carro';
  }
}
