import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
export class CreatePessoaDto {
    @IsEmail()
    email: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    senha: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    nome: string;
}
