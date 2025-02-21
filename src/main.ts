import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove chaves que não estão no meu DTO
      forbidNonWhitelisted: true, // vai gerar erro quando a chave não existir
      transform: false, // tenta transformar os tipos de dados de param e dtos
    }),
    new ParseIntIdPipe(),
  );
  // assim perde a injeção de depencia do nest vai para o app.module
  // app.useGlobalFilters(new MyExceptionFilter());
  // app.useGlobalGuards(new IsAdminGuard());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
