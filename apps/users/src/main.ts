import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@rental-system/filters';
import { microservicesClientFactory } from '@rental-system/config';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({ exposedHeaders: 'X-Total-Count' });

  // Api docs
  if (process.env.NODE_ENV !== 'production') {
    const swagger = new DocumentBuilder()
      .setTitle('Users')
      .setDescription('Users microservice API')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, swagger);
    SwaggerModule.setup('api/docs', app, document);
  }

  // Microservices module for sharing events
  app.connectMicroservice(microservicesClientFactory(config));

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = config.get<number>('PORT');
  await app.startAllMicroservices();
  await app.listen(port, () => Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix));
}

bootstrap();
