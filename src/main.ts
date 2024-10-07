import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/excepcion-filters/exception-filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors( new ResponseInterceptor)
  app.useGlobalFilters(new AllExceptionsFilter)


  const config = new DocumentBuilder()
    .setTitle('videogames example')
    .setDescription('The videogames API description')
    .setVersion('1.0')
    .addTag('videogames')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();