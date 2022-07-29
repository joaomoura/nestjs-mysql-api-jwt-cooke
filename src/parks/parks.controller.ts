import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, UseGuards, HttpCode } from '@nestjs/common';
import { ParksService } from './parks.service';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';

@Controller('parks')
export class ParksController {
  constructor(private readonly parksService: ParksService) { }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(
    @Body() createParkDto: CreateParkDto,
    @Req() request: RequestWithUser
  ) {
    return this.parksService.create(createParkDto);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findAll(@Req() request: RequestWithUser) {
    return this.parksService.findAll();
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() request: RequestWithUser
  ) {
    return this.parksService.findOne(+id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateParkDto: UpdateParkDto) {
    return this.parksService.update(+id, updateParkDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parksService.remove(+id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put(':id/exit')
  setAutoExit(@Param('id') id: string) {
    return this.parksService.upExit(+id);
  }
}
