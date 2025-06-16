import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  Request,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getByDoadorAtivo() {
    return this.usuarioService.findAllByDoadorAtivo();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Request() req, @Body() updateUserDto: UpdateUsuarioDto) {
    return this.usuarioService.update(req.user.id, updateUserDto);
  }
}
