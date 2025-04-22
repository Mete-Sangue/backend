import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Usuario, Prisma } from '@prisma/client';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}
  create(createUsuarioDto: Usuario) {
    return this.prisma.usuario.create({
      data: createUsuarioDto,
    });
  }

  findAll() {
    return this.prisma.usuario.findMany({});
  }

  async findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
  }

  update(usuario: Usuario) {
    return this.prisma.usuario.update({
      where: { id: usuario.id },
      data: usuario,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
