import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '@rental-system/auth';
import { MicroservicesModule } from '@rental-system/microservices';
import { BookModel } from './infrastructure/database/models/book.model';
import { BooksController } from './presentation/books.controller';
import { BooksRepository } from './infrastructure/database/repositories/books.repository';
import { BooksModelFactory } from './infrastructure/database/factories/books-model.factory';
import { BooksFactory } from './application/factories/books.factory';
import { BooksService } from './application/books.service';

@Module({
  imports: [SequelizeModule.forFeature([BookModel]), AuthModule, MicroservicesModule],
  controllers: [BooksController],
  providers: [BooksFactory, BooksModelFactory, BooksRepository, BooksService],
})
export class BooksModule {}
