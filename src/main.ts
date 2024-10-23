import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8080; // Jika PORT tidak disetel, gunakan 3000
  await app.listen(port);
}

bootstrap();
