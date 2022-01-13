import { Test, TestingModule } from '@nestjs/testing';
import { bookInputMock } from '@rental-system/dto-testing';
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
    const bookData = bookInputMock();
    const result = factory.create(bookData);
    expect({ name: result.name, author: result.author, pagesCount: result.pagesCount }).toEqual({
      name: bookData.name,
      author: bookData.author,
      pagesCount: bookData.pagesCount,
    });
  });
});
