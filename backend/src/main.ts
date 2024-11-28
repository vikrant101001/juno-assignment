/* eslint-disable prettier/prettier */
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.stage.dev' });  // Add this to load .env.stage.dev


async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for a specific origin
  app.enableCors({
    origin: [
      'http://localhost:5173',  // Local frontend URL
      'https://juno-assignment-frontend.onrender.com',  // Deployed frontend URL
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH',], // Allowed methods
    credentials: true, // If you need to send cookies or authentication headers
  });
  
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  
  const port = 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}

bootstrap();
