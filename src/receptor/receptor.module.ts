import { Module } from '@nestjs/common';
import { ReceptorService } from './receptor.service';
import { ReceptorController } from './receptor.controller';

@Module({
  controllers: [ReceptorController],
  providers: [ReceptorService],
})
export class ReceptorModule {}
