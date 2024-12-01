/* eslint-disable prettier/prettier */
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('API documentation for the Task Management App')
    .setVersion('1.0')
    .addBearerAuth( // Add BearerAuth for JWT tokens
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT-auth', // Name of the security scheme
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  
  const port = 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}

bootstrap();
