import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookModel } from './models/book.model';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksRepository } from './repositories/books.repository';

@Module({
  imports: [SequelizeModule.forFeature([BookModel])],
  controllers: [BooksController],
  providers: [BooksRepository, BooksService],
})
export class BooksModule {}
