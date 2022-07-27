import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import CreateUserDto from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    delete user.password;
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async getAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    if (users) {
      return users;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async showById(id: number): Promise<User> {
    const user = await this.findById(id);
    delete user.password;
    return user;
  }

  async findById(id: number) {
    return await this.usersRepository.findOne(id);
  }

  // async getUserWithCompanies(id: number) {
  //   return await this.userRepository.findOne(id, { relations: ['company'] });
  // }

  // async getAllUsersWithCompanies() {
  //   return await this.userRepository.find({ relations: ['company'] });
  // }
}