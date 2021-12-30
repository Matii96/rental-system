import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { rentalCardEntityMock } from '@rental-system/domain-testing';
import { RentalCardsRepository } from '../../infrastructure/database/repositories/rental-cards.repository';
import { IRentalCardRequest } from '../interfaces/rental-card-request.interface';
import { RentalCardGuard } from './rental-cards.guard';

describe('RentalCardGuard', () => {
  let guard: RentalCardGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentalCardGuard,
        {
          provide: RentalCardsRepository,
          useValue: { findById: jest.fn() },
        },
      ],
    }).compile();

    guard = module.get(RentalCardGuard);
  });

  it('should activate route', async () => {
    const card = rentalCardEntityMock();
    const req = <IRentalCardRequest>(<unknown>{ params: { rentalCardId: 'id' } });
    const contextMock = <ExecutionContext>{
      getHandler: () => null,
      getType: () => 'http',
      switchToHttp: () => ({ getRequest: () => req }),
    };
    // @ts-ignore
    jest.spyOn(guard, 'getRentalCard').mockResolvedValueOnce(card);

    expect(await guard.canActivate(contextMock)).toBe(true);
    expect(req.rentalCard).toBe(card);
  });
});
