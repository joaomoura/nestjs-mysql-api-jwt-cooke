import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { Repository } from 'typeorm';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { Park } from './park.entity';

@Injectable()
export class ParksService {
  constructor(
    @InjectRepository(Park) private parkRepository: Repository<Park>,
  ) {}

  async create(createParkDto: CreateParkDto) {
    if (createParkDto.updatedAt) {
      createParkDto = await this.sanitizeDateParkDto(createParkDto);
    }
    const createdPark = this.parkRepository.create(createParkDto);
    await createdPark.save();
    return createdPark;
  }

  async findAll(): Promise<Park[]> {
    const parks = await this.parkRepository.find();
    return parks;
  }

  async findOne(id: number): Promise<Park> {
    const park = await this.findById(id);
    if (!park) {
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
    }
    return park;
  }

  async findById(id: number) {
    return await this.parkRepository.findOne(id);
  }

  async update(id: number, post: UpdateParkDto) {
    if (post.updatedAt) {
      post = await this.sanitizeDateParkDto(post);
    }
    await this.parkRepository.update(id, post);
    const updatedPark = await this.parkRepository.findOne(id);
    if (!updatedPark) {
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
    }
    return updatedPark;
  }

  async remove(id: number) {
    const deletedPark = await this.parkRepository.delete(id);
    if (!deletedPark.affected) {
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
    }
  }

  async upExit(id: number) {
    const now = new Date();
    await this.parkRepository.update(id, {
      updatedAt: now
    });
    const updatedPark = await this.parkRepository.findOne(id);
    if (!updatedPark) {
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
    }
    return updatedPark;
  }

  async sanitizeDateParkDto(post) {
    const dayjs = require('dayjs');
    const customParseFormat = require('dayjs/plugin/customParseFormat');
    dayjs.extend(customParseFormat);
    const updatedAtToDb = dayjs(post.updatedAt, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
    return { ...post, updatedAt: updatedAtToDb };
  }
}
