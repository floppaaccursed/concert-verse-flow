import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3001;

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173'
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
  });

  app.use(cookieParser());
  app.setGlobalPrefix('api/v1', { exclude: ['health'] });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Users Service API')
    .setDescription('User management service API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Users service running on port ${port}`);
}

bootstrap();
