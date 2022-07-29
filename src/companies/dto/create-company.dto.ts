import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty()
  @IsNotEmpty({"message" : "O campo nome não pode ser vazio"})
  nome: string;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo cnpj não pode ser vazio"})
  cnpj: string;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo endereco não pode ser vazio"})
  endereco: string;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo telefone não pode ser vazio"})
  telefone: string;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo qtd_motos não pode ser vazio"})
  qtd_motos: number;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo qtd_carros não pode ser vazio"})
  qtd_carros: number;
}
