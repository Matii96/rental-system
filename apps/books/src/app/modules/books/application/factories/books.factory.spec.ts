import { Test, TestingModule } from '@nestjs/testing';
import { bookEntityMock } from '@rental-system/domain-testing';
import { bookInputMock } from '../../books.fixtures';
import { BooksFactory } from './books.factory';

describe('BooksFactory', () => {
  let factory: BooksFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksFactory],
    }).compile();

    factory = module.get(BooksFactory);
  });

  it('should create new entity', () => {
    const book = bookEntityMock();
    const result = factory.create(bookInputMock(book));
    expect({ name: result.name, author: result.author, pagesCount: result.pagesCount }).toEqual({
      name: book.name,
      author: book.author,
      pagesCount: book.pagesCount,
    });
  });
});
