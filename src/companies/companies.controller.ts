import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';

import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(
    @Body() createCompanyDto: CreateCompanyDto,
    @Req() request: RequestWithUser
  ) {
    return this.companiesService.create(createCompanyDto);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  index() {
    return this.companiesService.find();
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  show(
    @Param('id') id: string,
    @Req() request: RequestWithUser
  ) {
    return this.companiesService.showById(+id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Req() request: RequestWithUser
  ) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Res() res,
    @Req() request: RequestWithUser
  ) {
    this.companiesService.delete(+id);
    return res.status(HttpStatus.OK).json({ "message": "Automóvel excluído com sucesso!" });
  }

  @HttpCode(200)
  @Get(':id/automobiles')
  getUserWithCompanies(
    @Param('id') id: string,
    @Req() request: RequestWithUser
  ) {
    return this.companiesService.getCompanyWithAutomobiles(+id);
  }
}
