import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

import RequestWithUser from '../authentication/requestWithUser.interface';
import User from '../users/user.entity';
import { response } from 'express';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const createdCompany = this.companyRepository.create(createCompanyDto);
    await createdCompany.save();
    return createdCompany;
  }

  async find(): Promise<Company[]> {
    const autos = await this.companyRepository.find();
    return autos;
  }

  async showById(id: number): Promise<Company> {
    const company = await this.findById(id);
    if (!company) {
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
    }
    return company;
  }

  async findById(id: number) {
    return await this.companyRepository.findOne(id);
  }

  async findByNome(nome: string) {
    const company = await this.companyRepository.findOne({
      where: {
        nome: nome,
      },
    });
    if (!company) {
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
    }
    return company;
  }

  async update(id: number, post: UpdateCompanyDto) {
    await this.companyRepository.update(id, post);
    const updatedCompany = await this.companyRepository.findOne(id);
    if (!updatedCompany) {
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
    }
    return updatedCompany;
  }

  async delete(id: number) {
    const deletedCompany = await this.companyRepository.delete(id);
    if (!deletedCompany.affected) {
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
    }
  }

  // ####################### CHECK USER ########################### //
  async findByUser(requestUser: RequestWithUser): Promise<Company[]> {
    const user = requestUser.user;
    const company = await this.checkCompanyByUser(user);
    const autos = await this.companyRepository.find({
      where: { id: company.id }
    });
    return autos;
  }

  async checkCompanyByUser(user: User) {
    const company = user.company;
    if (!company) {
      throw new HttpException('Não há registro de empresa para este usuário.', HttpStatus.NOT_FOUND);
    }
    return company;
  }

  async getCompanyWithAutomobiles(id: number) {
    return await this.companyRepository.findOne(id, {relations: ['automobile'] });
  }

  async getCompanyWithParks(id: number) {
    return await this.companyRepository.findOne(id, {relations: ['parks'] });
  }

  async getCountParksInByCompany(id: number) {
    const countIn = await this.companyRepository.createQueryBuilder("c")
      .select("COUNT(p.id)", "entrada")
      .innerJoin("c.parks", "p")
      .where("c.id = :id", { id: id })
      .groupBy("c.id")
      .getRawOne();

    return countIn;
  }

  async getCountParksOutByCompany(id: number) {
    const countOut = await this.companyRepository.createQueryBuilder("c")
      .select("COUNT(p.id)", "saida")
      .innerJoin("c.parks", "p")
      .where("c.id = :id AND p.updatedAt IS NULL", { id: id })
      .groupBy("c.id")
      .getRawOne();
    return countOut;
  }

  async getCountParksInAndOutByCompany(id: number) {
    const open = await this.getCountParksInByCompany(id);
    const out = await this.getCountParksOutByCompany(id);
    return { entrada: open.entrada, saida: out.saida }
  }

  async getCountParksInByHour(id: number) {
    const countIn = await this.companyRepository.createQueryBuilder("c")
      .select("HOUR(p.createdAt) hora, COUNT(p.id)", "entrada")
      .innerJoin("c.parks", "p")
      .where("c.id = :id", { id })
      .groupBy("HOUR(p.createdAt)")
      .getRawMany();

    console.log(countIn)

    return countIn;
  }

  async getCountParksOutByHour(id: number) {
    const countIn = await this.companyRepository.createQueryBuilder("c")
      .select("HOUR(p.updatedAt) hora, COUNT(p.id)", "saida")
      .innerJoin("c.parks", "p")
      .where("c.id = :id", { id })
      .groupBy("HOUR(p.updatedAt)")
      .getRawMany();

    console.log(countIn)

    return countIn;
  }
}
