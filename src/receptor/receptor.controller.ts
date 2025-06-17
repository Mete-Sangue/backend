import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReceptorService } from './receptor.service';
import { CreateReceptorDto } from './dto/create-receptor.dto';
import { UpdateReceptorDto } from './dto/update-receptor.dto';
import { Receptor } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('receptor')
export class ReceptorController {
  constructor(private readonly receptorService: ReceptorService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: CreateReceptorDto) {
    return this.receptorService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.receptorService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receptorService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceptorDto: Receptor) {
    return this.receptorService.update(updateReceptorDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receptorService.remove(+id);
  }
}
