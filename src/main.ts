import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000, '0.0.0.0'); // Pastikan bind ke 0.0.0.0
  console.log('Server is running on port 3000');
}

bootstrap();
