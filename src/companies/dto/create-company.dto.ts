import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty({"message" : "O campo nome não pode ser vazio"})
  nome: string;

  @IsNotEmpty({"message" : "O campo cnpj não pode ser vazio"})
  cnpj: string;

  @IsNotEmpty({"message" : "O campo endereco não pode ser vazio"})
  endereco: string;

  @IsNotEmpty({"message" : "O campo telefone não pode ser vazio"})
  telefone: string;

  @IsNotEmpty({"message" : "O campo qtd_motos não pode ser vazio"})
  qtd_motos: number;

  @IsNotEmpty({"message" : "O campo qtd_carros não pode ser vazio"})
  qtd_carros: number;
}
