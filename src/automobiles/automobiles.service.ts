import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Automobile } from './automobile.entity';
import { CreateAutomobileDto } from './dto/create-automobile.dto';
import { UpdateAutomobileDto } from './dto/update-automobile.dto';

import RequestWithUser from '../authentication/requestWithUser.interface';
import User from '../users/user.entity';

@Injectable()
export class AutomobilesService {
  constructor(
    @InjectRepository(Automobile) private automobileRepository: Repository<Automobile>
  ) {}

  async create(createAutomobileDto: CreateAutomobileDto) {
    const createdAuto = this.automobileRepository.create(createAutomobileDto);
    await createdAuto.save();
    return createdAuto;
  }

  async find(): Promise<Automobile[]> {
    const autos = await this.automobileRepository.find();
    if (!autos) {
      throw new HttpException('Não há registros cadastrados', HttpStatus.NOT_FOUND);
    }
    return autos;
  }

  async showById(id: number): Promise<Automobile> {
    const auto = await this.automobileRepository.findOne(id);
    if (!auto) {
      throw new HttpException('Automóvel não encontrado', HttpStatus.NOT_FOUND);
    }
    return auto;
  }

  async update(id: number, post: UpdateAutomobileDto) {
    await this.automobileRepository.update(id, post);
    const updatedAuto = await this.automobileRepository.findOne(id);
    if (!updatedAuto) {
      throw new HttpException('Automóvel não encontrado', HttpStatus.NOT_FOUND);
    }
    return updatedAuto;
  }

  async delete(id: number) {
    const deletedAuto = await this.automobileRepository.delete(id);
    if (!deletedAuto.affected) {
      throw new HttpException('Automóvel não encontrado', HttpStatus.NOT_FOUND);
    }
  }

  async findByPlaca(placa: string) {
    const auto = await this.automobileRepository.findOne({
      where: {
        placa: placa,
      },
    });
    if (!auto) {
      throw new HttpException('Automóvel não encontrado', HttpStatus.NOT_FOUND);
    }
    return auto;
  }

  async getAutomobileWithCompany(id: number) {
    return await this.automobileRepository.findOne(id, { relations: ['company'] });
  }

  async findById(id: number) {
    return await this.automobileRepository.findOne(id);
  }

  // ##################### CHECK USER ######################### //
  async findByUserCompany(requestUser: RequestWithUser): Promise<Automobile[]> {
    const user = requestUser.user;
    const company = await this.checkCompanyByUser(user);
    const autos = await this.automobileRepository.find({
      where: { companyId: company.id }
    });
    if (!autos) {
      throw new HttpException('Não há registros cadastrados', HttpStatus.NOT_FOUND);
    }
    return autos;
  }

  async showByIdByUserCompany(id: number, requestUser: RequestWithUser): Promise<Automobile> {
    const user = requestUser.user;
    const company = await this.checkCompanyByUser(user);
    const auto = await this.automobileRepository.findOne(id, {
      where: { companyId: company.id },
    });
    if (!auto) {
      throw new HttpException('Automóvel não encontrado', HttpStatus.NOT_FOUND);
    }
    return auto;
  }

  async updateByUserCompany(id: number, post: UpdateAutomobileDto, requestUser: RequestWithUser) {
    const user = requestUser.user;
    const company = await this.checkCompanyByUser(user);
    const auto = await this.automobileRepository.findOne(id, {
      where: { companyId: company.id }
    });
    if (!auto) {
      throw new HttpException('Automóvel não encontrado para esta empresa.', HttpStatus.NOT_FOUND);
    }
    await this.automobileRepository.update(id, post);
    const updatedAuto = await this.automobileRepository.findOne(id);
    if (!updatedAuto) {
      throw new HttpException('Automóvel não encontrado', HttpStatus.NOT_FOUND);
    }
    return updatedAuto;
  }

  async checkCompanyByUser(user: User) {
    const company = user.company;
    if (!company) {
      throw new HttpException('Não há registro de empresa para este usuário.', HttpStatus.NOT_FOUND);
    }
    return company;
  }
}
