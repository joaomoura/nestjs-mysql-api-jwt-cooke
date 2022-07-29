import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({"message" : "O campo nome não pode ser vazio"})
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({"message" : "O campo password não pode ser vazio"})
  password: string;
}
