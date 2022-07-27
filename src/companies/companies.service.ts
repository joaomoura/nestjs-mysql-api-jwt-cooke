import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const company = this.companyRepository.create(createCompanyDto);
    await company.save();
    return company;
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

  async getCompanyWithAutomobiles(id: number) {
    return await this.companyRepository.findOne(id, {relations: ['automobiles'] });
  }
}
