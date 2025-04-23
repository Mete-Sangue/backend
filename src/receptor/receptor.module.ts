import { Module } from '@nestjs/common';
import { ReceptorService } from './receptor.service';
import { ReceptorController } from './receptor.controller';
import { AppModule } from 'src/app.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReceptorController],
  providers: [ReceptorService],
})
export class ReceptorModule {}
