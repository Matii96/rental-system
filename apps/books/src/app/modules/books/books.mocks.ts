import { BookEntity } from '@rental-system/domain';
import { BookModel } from './infrastructure/database/models/book.model';

export const bookModelMock = (book: BookEntity) =>
  <BookModel>{
    id: book.id.toString(),
    name: book.name,
    author: book.author,
    pagesCount: book.pagesCount,
    createdAt: book.createdAt,
  };
