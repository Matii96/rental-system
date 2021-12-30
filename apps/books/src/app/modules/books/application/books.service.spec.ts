import { Test, TestingModule } from '@nestjs/testing';
import { bookEntityMock } from '@rental-system/domain-testing';
import { AvailabilityMicroserviceClient } from '@rental-system/microservices';
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
          provide: BooksFactory,
          useValue: { create: jest.fn(() => bookEntityMock()) },
        },
        {
          provide: BooksRepository,
          useValue: {},
        },
        {
          provide: AvailabilityMicroserviceClient,
          useValue: { registerAvailability: jest.fn(), unregisterAvailability: jest.fn() },
        },
      ],
    }).compile();

    service = module.get(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
