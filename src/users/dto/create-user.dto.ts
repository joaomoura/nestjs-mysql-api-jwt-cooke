import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({"message" : "O campo nome não pode ser vazio"})
  @IsEmail()
  email: string;

  @IsNotEmpty({"message" : "O campo password não pode ser vazio"})
  password: string;
}
