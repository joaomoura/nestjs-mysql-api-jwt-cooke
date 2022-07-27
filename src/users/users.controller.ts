import { Controller, Get, Post, Body, Param, UseGuards, HttpCode } from '@nestjs/common';

import { UsersService } from './users.service';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  show(@Param('id') id: string) {
    return this.usersService.getById(+id);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  showAll() {
    return this.usersService.getAll();
  }

  // @Get()
  // getAllUsersWithCompanies() {
  //   return this.usersService.getAllUsersWithCompanies();
  // }

  // @Get(':id/companies')
  // getUserWithCompanies(@Param('id') id: string) {
  //   return this.usersService.getUserWithCompanies(+id);
  // }
}
