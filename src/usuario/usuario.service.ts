import { Injectable, NotFoundException } from '@nestjs/common';
import { Usuario as PrismaUser, Prisma } from '@prisma/client';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';

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

  async update(id: number, updateUserDto: UpdateUsuarioDto) {
    if (updateUserDto.senha) {
      const salt = await bcrypt.genSalt();
      updateUserDto.senha = await bcrypt.hash(updateUserDto.senha, salt);
    }

    try {
      const user = await this.prisma.usuario.update({
        where: { id },
        data: updateUserDto,
      });

      const { senha, ...result } = user;
      return result;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Utilizador com o ID ${id} não encontrado.`,
        );
      }
      throw error;
    }
  }
}
