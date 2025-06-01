import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove any props not in your DTO
      forbidNonWhitelisted: true, // throw if unknown props are passed
      transform: true, // auto-convert payloads to DTO instances
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Wash API')
    .setDescription('Documentation for the Wash backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI served at /api

  await app.listen(3000);
}
bootstrap();
