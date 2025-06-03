// src/usuario/entities/usuario.entity.ts
import { Exclude } from 'class-transformer';
import { Usuario as PrismaUser } from '@prisma/client'; // Importe o tipo gerado pelo Prisma

export class Usuario implements Partial<PrismaUser> {
  // Implementar Partial<PrismaUser> é opcional mas pode ajudar na tipagem
  id: number;
  nome: string;
  email: string;
  doadorAtivo: boolean;
  cep?: string | undefined;
  dataNascimento?: Date | undefined;
  nomeCompleto?: string | undefined;
  senha?: string | undefined;
  telefone?: string | undefined;
  tipoSanguineo?: string | undefined;
  ultimaDoacao?: Date | null | undefined;

  @Exclude()
  password?: string | null;

  constructor(partial: Partial<Usuario>) {
    Object.assign(this, partial);
  }
}
