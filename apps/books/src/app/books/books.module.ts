import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookModel } from './models/book.model';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [SequelizeModule.forFeature([BookModel])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
