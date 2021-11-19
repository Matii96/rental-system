import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { bookEntityMock } from '@rental-system/domain-testing';
import { SequelizeMock } from '@rental-system/database-storage';
import { BookModel } from '../models/book.model';
import { BooksModelFactory } from './factories/books-model.factory';
import { BooksRepository } from './books.repository';

describe('BooksRepository', () => {
  let repository: BooksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksRepository,
        {
          provide: getModelToken(BookModel),
          useClass: SequelizeMock,
        },
        {
          provide: BooksModelFactory,
          useValue: { entityToModel: jest.fn(() => bookEntityMock()), modelToEntity: jest.fn(() => bookEntityMock()) },
        },
      ],
    }).compile();

    repository = module.get(BooksRepository);
  });

  it('should find queried books', async () => {
    expect(await repository.findAll()).toEqual([]);
  });
});
