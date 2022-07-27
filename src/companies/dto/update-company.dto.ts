import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateCompanyDto {
  nome: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  qtd_motos: number;
  qtd_carros: number;
}
