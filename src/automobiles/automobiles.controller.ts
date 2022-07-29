import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseGuards } from '@nestjs/common';

import { AutomobilesService } from './automobiles.service';
import { CreateAutomobileDto } from './dto/create-automobile.dto';
import { UpdateAutomobileDto } from './dto/update-automobile.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
// import RequestWithUser from '../authentication/requestWithUser.interface';

@Controller('automobiles')
export class AutomobilesController {
  constructor(private readonly automobilesService: AutomobilesService) { }
  
  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(
    @Body() createAutomobileDto: CreateAutomobileDto,
    // @Req() requestUser: RequestWithUser
  ) {
    // const user = requestUser.user;
    return this.automobilesService.create({
      ...createAutomobileDto,
      // companyId: user.company.id
    });
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  index() {
    return this.automobilesService.find();
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  show(
    @Param('id') id: string,
    // @Req() requestUser: RequestWithUser
  ) {
    return this.automobilesService.showById(+id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAutomobileDto: UpdateAutomobileDto
  ) {
    return this.automobilesService.update(+id, updateAutomobileDto);
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
    // @Req() requestUser: RequestWithUser
  ) {
    return this.automobilesService.delete(+id);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get(':id/company')
  getAutomobileWithCompany(
    @Param('id') id: string,
    // @Req() requestUser: RequestWithUser
  ) {
    return this.automobilesService.getAutomobileWithCompany(+id);
  }
}
