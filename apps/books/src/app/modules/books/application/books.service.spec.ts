import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { bookEntityMock } from '@rental-system/domain-testing';
import { MicroservicesEnum } from '@rental-system/microservices';
import { BooksRepository } from '../infrastructure/database/repositories/books.repository';
import { BooksFactory } from './factories/books.factory';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: MicroservicesEnum.AVAILABILITY,
          useValue: { send: jest.fn(() => of()) },
        },
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
