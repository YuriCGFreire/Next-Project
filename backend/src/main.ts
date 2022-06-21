import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Next Project Api')
    .setDescription('Api for learning NextJs and Docker')
    .setVersion('1.0')
    .addTag('NextJs')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
