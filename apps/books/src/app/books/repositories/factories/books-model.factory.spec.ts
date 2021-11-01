import { Test, TestingModule } from '@nestjs/testing';
import { BookEntity } from '@rental-system/domain';
import { bookEntityMock } from '@rental-system/domain-testing';
import { BookModel } from '../../models/book.model';
import { BooksModelFactory } from './books-model.factory';

const bookModelObjectMock = (book: BookEntity) =>
  <BookModel>{
    id: book.id,
    name: book.name,
    author: book.author,
    pagesCount: book.pagesCount,
    createdAt: book.createdAt,
  };

describe('BooksModelFactory', () => {
  let factory: BooksModelFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksModelFactory],
    }).compile();

    factory = module.get(BooksModelFactory);
  });

  it('should map entity to model', () => {
    const book = bookEntityMock();
    expect(factory.entityToModel(book)).toEqual(bookModelObjectMock(book));
  });

  it('should map model to entity', () => {
    const book = bookEntityMock();
    expect(factory.modelToEntity(bookModelObjectMock(book))).toEqual(book);
  });
});
