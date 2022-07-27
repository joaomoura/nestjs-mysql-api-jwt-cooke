import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAutomobileDto {
  @IsNotEmpty({"message" : "O campo marca não pode ser vazio"})
  marca: string;

  @IsNotEmpty({"message" : "O campo modelo não pode ser vazio"})
  modelo: string;

  @IsNotEmpty({"message" : "O campo cor não pode ser vazio"})
  cor: string;

  @IsNotEmpty({"message" : "O campo placa não pode ser vazio"})
  placa: string;

  @IsNotEmpty({"message" : "O campo tipo não pode ser vazio"})
  tipo: string;

  // @IsNotEmpty({"message" : "O campo companyId não pode ser vazio"})
  companyId: number;
}
