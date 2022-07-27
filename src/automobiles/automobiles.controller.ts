import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseGuards } from '@nestjs/common';

import { AutomobilesService } from './automobiles.service';
import { CreateAutomobileDto } from './dto/create-automobile.dto';
import { UpdateAutomobileDto } from './dto/update-automobile.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';

@Controller('automobiles')
export class AutomobilesController {
  constructor(private readonly automobilesService: AutomobilesService) { }
  
  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(
    @Body() createAutomobileDto: CreateAutomobileDto,
    @Req() request: RequestWithUser
  ) {
    const user = request.user;
    return this.automobilesService.create({
      ...createAutomobileDto,
      companyId: user.company.id
    });
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  index(@Req() request: RequestWithUser) {
    return this.automobilesService.find(request);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  show(
    @Param('id') id: string,
    @Req() request: RequestWithUser
  ) {
    return this.automobilesService.showById(+id, request);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAutomobileDto: UpdateAutomobileDto,
    @Req() request: RequestWithUser
  ) {
    return this.automobilesService.update(+id, updateAutomobileDto);
  }

  @HttpCode(200)
  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Req() request: RequestWithUser
  ) {
    return this.automobilesService.delete(+id);
  }

  @HttpCode(200)
  @Get(':id/company')
  getAutomobileWithCompany(
    @Param('id') id: string,
    @Req() request: RequestWithUser
  ) {
    return this.automobilesService.getAutomobileWithCompany(+id);
  }
}
