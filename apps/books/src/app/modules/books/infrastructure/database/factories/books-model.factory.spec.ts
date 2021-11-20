import { Test, TestingModule } from '@nestjs/testing';
import { bookEntityMock } from '@rental-system/domain-testing';
import { bookModelObjectMock } from '../../../books.fixtures';
import { BooksModelFactory } from './books-model.factory';

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
