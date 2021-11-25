import { Test, TestingModule } from '@nestjs/testing';
import { AvailabilityService } from './availability.service';

describe('AvailabilityService', () => {
  let service: AvailabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvailabilityService],
    }).compile();

    service = module.get(AvailabilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
