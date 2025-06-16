import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  Matches,
  IsInt,
  Min,
} from 'class-validator';

export class CreateReceptorDto {
  @IsString({ message: 'O CPF deve ser uma string.' })
  @IsNotEmpty({ message: 'O CPF não pode estar vazio.' })
  @Matches(/^\d{11}$/, { message: 'O CPF deve conter 11 dígitos numéricos.' })
  cpf: string;

  @IsString({ message: 'A descrição deve ser uma string.' })
  @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
  @MinLength(10, { message: 'A descrição deve ter no mínimo 10 caracteres.' })
  descricao: string;

  @IsString({ message: 'O nome completo deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome completo não pode estar vazio.' })
  @MinLength(3, { message: 'O nome completo deve ter no mínimo 3 caracteres.' })
  nomeCompleto: string;

  @IsString({ message: 'O nome do hospital deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome do hospital não pode estar vazio.' })
  hospital: string;

  @IsString({ message: 'A quantidade deve ser uma string.' })
  @IsNotEmpty({ message: 'A quantidade não pode estar vazia.' })
  quantidade: string;

  @IsString({ message: 'O documento do receptor deve ser uma string.' })
  @IsNotEmpty({ message: 'O documento do receptor não pode estar vazio.' })
  documentoReceptor: string;

  @IsString({ message: 'O telefone deve ser uma string.' })
  @IsNotEmpty({ message: 'O telefone não pode estar vazio.' })
  @Matches(/^\d{10,11}$/, {
    message: 'O telefone deve conter 10 ou 11 dígitos numéricos.',
  })
  telefone: string;

  @IsInt({ message: 'O ID do usuário deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O ID do usuário não pode estar vazio.' })
  @Min(1, { message: 'O ID do usuário deve ser um número positivo.' })
  @Type(() => Number)
  usuarioId: number;
}
