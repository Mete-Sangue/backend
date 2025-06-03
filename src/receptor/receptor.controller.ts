import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReceptorService } from './receptor.service';
import { CreateReceptorDto } from './dto/create-receptor.dto';
import { UpdateReceptorDto } from './dto/update-receptor.dto';
import { Receptor } from '@prisma/client';

@Controller('receptor')
export class ReceptorController {
  constructor(private readonly receptorService: ReceptorService) {}

  @Post()
  create(@Body() data: CreateReceptorDto) {
    return this.receptorService.create(data);
  }

  @Get()
  findAll() {
    return this.receptorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receptorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceptorDto: Receptor) {
    return this.receptorService.update(updateReceptorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receptorService.remove(+id);
  }
}
