import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookModel } from './models/book.model';
import { BooksController } from './books.controller';
import { BooksFactory } from './factories/books-model.factory';
import { BooksRepository } from './repositories/books.repository';
import { BooksModelFactory } from './repositories/factories/books-model.factory';
import { BooksService } from './books.service';

@Module({
  imports: [SequelizeModule.forFeature([BookModel])],
  controllers: [BooksController],
  providers: [BooksFactory, BooksModelFactory, BooksRepository, BooksService],
})
export class BooksModule {}
