import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateAutomobileDto {
  marca: string;
  modelo: string;
  cor: string;
  placa: string;
  tipo: string;
  companyId: number;
}
