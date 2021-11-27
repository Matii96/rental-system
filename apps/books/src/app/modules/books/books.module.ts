import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from '@rental-system/auth';
import { microservicesClientFactory } from '@rental-system/config';
import { MicroservicesEnum } from '@rental-system/microservices';
import { BookModel } from './infrastructure/database/models/book.model';
import { BooksController } from './presentation/books.controller';
import { BooksRepository } from './infrastructure/database/repositories/books.repository';
import { BooksModelFactory } from './infrastructure/database/factories/books-model.factory';
import { BooksMicroservicesSender } from './infrastructure/microservices-senders/books.microservices-sender';
import { BooksFactory } from './application/factories/books.factory';
import { BooksService } from './application/books.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: MicroservicesEnum.AVAILABILITY,
        inject: [ConfigService],
        useFactory: microservicesClientFactory,
      },
    ]),
    SequelizeModule.forFeature([BookModel]),
    AuthModule,
  ],
  controllers: [BooksController],
  providers: [BooksFactory, BooksModelFactory, BooksRepository, BooksMicroservicesSender, BooksService],
})
export class BooksModule {}
