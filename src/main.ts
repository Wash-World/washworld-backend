import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove any props not in your DTO
      forbidNonWhitelisted: true, // throw if unknown props are passed
      transform: true, // auto-convert payloads to DTO instances
    }),
  );
  await app.listen(3000);
}
bootstrap();
