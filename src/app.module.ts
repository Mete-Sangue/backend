import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ReceptorModule } from './receptor/receptor.module';

@Module({
  imports: [UsuarioModule, ReceptorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
