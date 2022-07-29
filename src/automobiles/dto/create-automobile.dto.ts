import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';

export class CreateAutomobileDto {
  @ApiProperty()
  @IsNotEmpty({"message" : "O campo marca não pode ser vazio"})
  marca: string;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo modelo não pode ser vazio"})
  modelo: string;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo cor não pode ser vazio"})
  cor: string;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo placa não pode ser vazio"})
  placa: string;

  @IsIn(['carro', 'moto'])
  @IsNotEmpty({"message" : "O campo tipo não pode ser vazio"})
  tipo: string;

  @ApiProperty()
  companyId: number;
}
