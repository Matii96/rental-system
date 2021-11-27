import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { availabilityEntityMock } from '@rental-system/domain-testing';
import { AvailabilityRepository } from '../../infrastructure/database/repositories/availability.repository';
import { IAvailabilityRequest } from '../interfaces/availability-request.interface';
import { AvailabilityGuard } from './availability.guard';

describe('AvailabilityGuard', () => {
  let guard: AvailabilityGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvailabilityGuard,
        {
          provide: AvailabilityRepository,
          useValue: { findById: jest.fn() },
        },
      ],
    }).compile();

    guard = module.get(AvailabilityGuard);
  });

  it('should activate route', async () => {
    const availability = availabilityEntityMock();
    const req = <IAvailabilityRequest>(<unknown>{ params: { availabilityId: 'id' } });
    const contextMock = <ExecutionContext>{
      getHandler: () => null,
      getType: () => 'http',
      switchToHttp: () => ({ getRequest: () => req }),
    };
    // @ts-ignore
    jest.spyOn(guard, 'getAvailability').mockResolvedValueOnce(availability);

    expect(await guard.canActivate(contextMock)).toBe(true);
    expect(req.availability).toBe(availability);
  });
});
