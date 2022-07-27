import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

import { Automobile } from './automobile.entity';
import { CreateAutomobileDto } from './dto/create-automobile.dto';
import { UpdateAutomobileDto } from './dto/update-automobile.dto';

@Injectable()
export class AutomobilesService {
  constructor(
    @InjectRepository(Automobile) private automobileRepository: Repository<Automobile>
  ) {}

  async create(createAutomobileDto: CreateAutomobileDto) {
    console.log(createAutomobileDto);
    const auto = this.automobileRepository.create(createAutomobileDto);
    await auto.save();
    return auto;
  }

  async find(requestUser: RequestWithUser): Promise<Automobile[]> {
    const user = requestUser.user;
    const autos = await this.automobileRepository.find({
      where: {
        companyId: user.company.id,
      },
    });
    return autos;
  }

  async showById(id: number, requestUser: RequestWithUser): Promise<Automobile> {
    const user = requestUser.user;
    const auto = await this.automobileRepository.findOne(id, {
      where: {
        companyId: user.company.id,
      },
    });
    if (!auto) {
      throw new HttpException('Automóvel não encontrado', HttpStatus.NOT_FOUND);
    }
    return auto;
  }

  async findById(id: number) {
    return await this.automobileRepository.findOne(id);
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

  async getAutomobileWithCompany(id: number) {
    return await this.automobileRepository.findOne(id, { relations: ['company'] });
  }
}
