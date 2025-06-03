import {
  IsString,
  IsNotEmpty,
  MinLength,
  Matches,
  IsInt, // Importado para validar números inteiros
  Min, // Importado para validar o valor mínimo de um número
} from 'class-validator';
// Se você precisar converter automaticamente strings para números para o usuarioId
// (por exemplo, se vier de um parâmetro de rota como string),
// você pode usar @Type(() => Number) do class-transformer.
// import { Type } from 'class-transformer';

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

  @IsString({ message: 'A quantidade deve ser uma string.' }) // Mantido como string conforme original
  @IsNotEmpty({ message: 'A quantidade não pode estar vazia.' })
  quantidade: string;

  @IsString({ message: 'O documento do receptor deve ser uma string.' })
  @IsNotEmpty({ message: 'O documento do receptor não pode estar vazio.' })
  documentoReceptor: string; // Pode ser um link, nome de arquivo, etc.

  @IsString({ message: 'O telefone deve ser uma string.' })
  @IsNotEmpty({ message: 'O telefone não pode estar vazio.' })
  @Matches(/^\d{10,11}$/, {
    message: 'O telefone deve conter 10 ou 11 dígitos numéricos.',
  })
  telefone: string;

  // Novo campo para a chave estrangeira do usuário
  @IsInt({ message: 'O ID do usuário deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O ID do usuário não pode estar vazio.' })
  @Min(1, { message: 'O ID do usuário deve ser um número positivo.' }) // Assumindo que IDs são > 0
  // @Type(() => Number) // Descomente se o usuarioId puder vir como string e precisar de conversão
  usuarioId: number;
}
