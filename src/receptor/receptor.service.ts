import { Injectable } from '@nestjs/common';
import { CreateReceptorDto } from './dto/create-receptor.dto';
import { UpdateReceptorDto } from './dto/update-receptor.dto';
import { Receptor, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReceptorService {
  constructor(private prisma: PrismaService) {}
  create(createReceptorDto: CreateReceptorDto) {
    return this.prisma.receptor.create({
      data: createReceptorDto,
    });
  }

  findAll() {
    return this.prisma.receptor.findMany({});
  }

  findAllByUser(userId: number) {
    return this.prisma.receptor.findMany({ where: { usuarioId: userId } });
  }

  async findOne(id: number) {
    return this.prisma.receptor.findUnique({
      where: { id },
    });
  }

  update(receptor: Receptor, usuarioId: number) {
    return this.prisma.receptor.update({
      where: { id: receptor.id, usuarioId: usuarioId },
      data: receptor,
    });
  }

  remove(id: number, usuarioId: number) {
    return this.prisma.receptor.delete({
      where: {
        id: id,
        usuarioId: usuarioId,
      },
    });
  }
}
