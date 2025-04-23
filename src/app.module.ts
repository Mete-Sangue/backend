import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ReceptorModule } from './receptor/receptor.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsuarioModule, ReceptorModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
