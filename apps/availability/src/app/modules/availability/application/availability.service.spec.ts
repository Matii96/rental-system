import { Test, TestingModule } from '@nestjs/testing';
import { availabilityEntityMock } from '@rental-system/domain-testing';
import { AvailabilityRepository } from '../infrastructure/database/repositories/availability.repository';
import { AvailabilityService } from './availability.service';
import { AvailabilityFactory } from './factories/availability.factory';

describe('AvailabilityService', () => {
  let service: AvailabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvailabilityService,
        {
          provide: AvailabilityFactory,
          useValue: { create: jest.fn(() => availabilityEntityMock()) },
        },
        {
          provide: AvailabilityRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get(AvailabilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
