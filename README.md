<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

 
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Begin the project


```bash
nest new nameofproject
```

### App config

```typescript

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: configService.get<number>('DATABASE_PORT', 5432), 
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, 
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}


```

### Install ORM and postgresql

```bash
npm install --save @nestjs/typeorm typeorm pg

```

### install ConfigModule forn .env

```bash
npm i @nestjs/config
```

### Install swagger

```bash
npm install @nestjs/swagger swagger-ui-express
```

### Install bcrypt

```bash
npm install bcrypt
npm install @types/bcrypt --save-dev
```

### Install JWT (JSON Web Token)

```bash
npm install @nestjs/jwt passport-jwt
npm install @types/passport-jwt --save-dev
```

### Install class-validator


```bash
npm install class-validator
npm install class-transformer
```


```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('vortextream');

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );


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
```


### Made commons

```bash
mkdir src\common
mkdir src\common\enums
mkdir src\common\decorators
mkdir src\common\filters
mkdir src\common\excepcion-filters
mkdir src\common\services
```

### GenericService

```typescript

import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';
import { BaseEntity } from 'typeorm';

@Injectable()
export class GenericService<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) {}

  async create(createDto: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(createDto);
    return await this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<T> {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }
  async update(id: string, updateDto: DeepPartial<T>): Promise<T> { 
    const entity = await this.findOne(id);
    this.repository.merge(entity, updateDto);
    return await this.repository.save(entity);
  }

  async delete(id: string): Promise<T> {
    const deletedItem = await this.repository.findOne({ where: { id } as any });
    if (!deletedItem) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    await this.repository.delete(id);
    return deletedItem;
  }
}
```







Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
