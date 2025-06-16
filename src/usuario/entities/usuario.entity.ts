import { Exclude } from 'class-transformer';
import { Usuario as PrismaUser } from '@prisma/client';

export class Usuario implements Partial<PrismaUser> {
  id: number;
  email: string;
  doadorAtivo: boolean;
  cep?: string | undefined;
  dataNascimento?: Date | undefined;
  nomeCompleto?: string | undefined;
  telefone?: string | undefined;
  tipoSanguineo?: string | undefined;
  ultimaDoacao?: Date | null | undefined;

  @Exclude()
  senha: string;

  constructor(partial: Partial<Usuario>) {
    Object.assign(this, partial);
  }
}
