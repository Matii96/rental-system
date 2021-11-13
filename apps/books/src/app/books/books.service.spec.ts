import { Test, TestingModule } from '@nestjs/testing';
import { bookEntityMock } from '@rental-system/domain-testing';
import { BooksFactory } from './factories/books-model.factory';
import { BooksRepository } from './repositories/books.repository';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: BooksFactory,
          useValue: { create: jest.fn(() => bookEntityMock()) },
        },
        {
          provide: BooksRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
