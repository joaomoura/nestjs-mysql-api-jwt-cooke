import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Company } from '../companies/company.entity';
import { Park } from 'src/parks/park.entity';

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

  @Column({ nullable: true })
  companyId: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => Park, park => park.automobile, { cascade: ['remove'] })
  public parks: Park[];

  async validateTipo(tipo: string): Promise<boolean> {
    return await tipo === 'moto' || tipo === 'carro';
  }
}
