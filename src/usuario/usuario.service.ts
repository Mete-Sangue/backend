import { Injectable } from '@nestjs/common';
import { Usuario as PrismaUser, Prisma } from '@prisma/client';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}
  async findOneByEmail(email: string): Promise<PrismaUser | null> {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  async findOneById(id: number): Promise<PrismaUser | null> {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
    });
    if (!user) {
      // Lançar exceção aqui ou deixar o JwtStrategy/AuthService lidar com null
      // throw new NotFoundException(`Usuário com ID "${id}" não encontrado.`);
      return null;
    }
    return user;
  }

  async findAllByDoadorAtivo(): Promise<Usuario[]> {
    const users = await this.prisma.usuario.findMany({
      where: { doadorAtivo: true },
    });

    return users.map((userFromDb) => new Usuario(userFromDb));
  }

  async create(data: Prisma.UsuarioCreateInput): Promise<PrismaUser> {
    return this.prisma.usuario.create({
      data,
    });
  }
}
