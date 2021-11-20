import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookModel } from './infrastructure/database/models/book.model';
import { BooksController } from './presentation/books.controller';
import { BooksRepository } from './infrastructure/database/repositories/books.repository';
import { BooksModelFactory } from './infrastructure/database/factories/books-model.factory';
import { BooksFactory } from './application/factories/books-model.factory';
import { BooksService } from './application/books.service';

@Module({
  imports: [SequelizeModule.forFeature([BookModel])],
  controllers: [BooksController],
  providers: [BooksFactory, BooksModelFactory, BooksRepository, BooksService],
})
export class BooksModule {}
