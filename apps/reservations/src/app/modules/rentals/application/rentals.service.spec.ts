import { Test, TestingModule } from '@nestjs/testing';
import { rentalEntityMock } from '@rental-system/domain-testing';
import { RentalsRepository } from '../infrastructure/database/repositories/rentals.repository';
import { RentalsFactory } from './factories/rentals.factory';
import { RentalsService } from './rentals.service';

describe('RentalsService', () => {
  let service: RentalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentalsService,
        { provide: RentalsFactory, useValue: { create: jest.fn(() => rentalEntityMock()) } },
        { provide: RentalsRepository, useValue: {} },
      ],
    }).compile();

    service = module.get(RentalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
