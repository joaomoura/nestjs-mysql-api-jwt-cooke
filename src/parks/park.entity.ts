import { Post } from "@nestjs/common";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity } from "typeorm"
import { Automobile } from "../automobiles/automobile.entity"
import { Company } from "../companies/company.entity"

@Entity()
export class Park extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    public automobileId!: number

    @Column()
    public companyId!: number

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;

    @ManyToOne(() => Automobile, (automobile) => automobile.parks, { eager: true })
    public automobile!: Automobile

    @ManyToOne(() => Company, (company) => company.parks)
    public company!: Company
}
