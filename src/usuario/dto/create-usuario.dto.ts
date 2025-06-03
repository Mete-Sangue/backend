import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsISO8601,
  IsBoolean,
  IsOptional,
  Matches,
  IsIn,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUsuarioDto {
  @IsEmail({}, { message: 'O email fornecido não é válido.' })
  @IsNotEmpty({ message: 'O email não pode estar vazio.' })
  email: string;

  @IsString({ message: 'O nome completo deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome completo não pode estar vazio.' })
  @MinLength(3, { message: 'O nome completo deve ter no mínimo 3 caracteres.' })
  nomeCompleto: string;

  @IsString({ message: 'A senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  senha: string;

  @IsString({ message: 'O tipo sanguíneo deve ser uma string.' })
  @IsNotEmpty({ message: 'O tipo sanguíneo não pode estar vazio.' })
  @IsIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
  tipoSanguineo: string;

  @IsISO8601(
    {},
    {
      message:
        'A data de nascimento deve estar no formato ISO 8601 (YYYY-MM-DD).',
    },
  )
  @IsNotEmpty({ message: 'A data de nascimento não pode estar vazia.' })
  dataNascimento: string;

  @IsString({ message: 'O telefone deve ser uma string.' })
  @IsNotEmpty({ message: 'O telefone não pode estar vazio.' })
  @Matches(/^\d{10,11}$/, {
    message: 'O telefone deve conter 10 ou 11 dígitos numéricos.',
  })
  telefone: string;

  @IsString({ message: 'O CEP deve ser uma string.' })
  @IsNotEmpty({ message: 'O CEP não pode estar vazio.' })
  @Matches(/^\d{8}$/, { message: 'O CEP deve conter 8 dígitos numéricos.' })
  cep: string;

  @IsBoolean({
    message: 'O campo doadorAtivo deve ser um valor booleano (true ou false).',
  })
  @IsNotEmpty({ message: 'O campo doadorAtivo não pode estar vazio.' })
  doadorAtivo: boolean;

  @IsOptional()
  @IsISO8601(
    {},
    {
      message:
        'A última doação deve estar no formato ISO 8601 (YYYY-MM-DD) se fornecida.',
    },
  )
  ultimaDoacao?: string;
}
