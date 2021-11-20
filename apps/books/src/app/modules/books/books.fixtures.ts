import { BookEntity } from '@rental-system/domain';
import { bookEntityMock } from '@rental-system/domain-testing';
import { BookModel } from './infrastructure/database/models/book.model';
import { BookInputDto } from './presentation/dto/input.dto';

export const bookInputMock = (book = bookEntityMock()) => {
  const dto = new BookInputDto();
  dto.name = book.name;
  dto.author = book.author;
  dto.pagesCount = book.pagesCount;
  return dto;
};

export const bookModelObjectMock = (book: BookEntity) =>
  <BookModel>{
    id: book.id,
    name: book.name,
    author: book.author,
    pagesCount: book.pagesCount,
    createdAt: book.createdAt,
  };
