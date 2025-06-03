import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não estão no DTO
      forbidNonWhitelisted: true, // Lança erro se propriedades não listadas forem enviadas
      transform: true, // Transforma o payload para instâncias de DTOs (e tipos, se possível)
      transformOptions: {
        enableImplicitConversion: true, // Permite conversão implícita de tipos (ex: string de query para number)
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
