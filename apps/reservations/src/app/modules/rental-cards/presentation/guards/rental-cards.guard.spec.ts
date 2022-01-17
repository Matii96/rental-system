import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AggregateId } from '@rental-system/common';
import { rentalCardEntityMock, userCustomerEntityMock } from '@rental-system/domain-testing';
import { RentalCardsRepository } from '../../infrastructure/database/repositories/rental-cards.repository';
import { IRentalCardRequest } from '../interfaces/rental-card-request.interface';
import { RentalCardGuard } from './rental-cards.guard';

describe('RentalCardGuard', () => {
  let guard: RentalCardGuard;
  let rentalCardsRepositoryMock: RentalCardsRepository;

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
    rentalCardsRepositoryMock = module.get(RentalCardsRepository);
  });

  describe('getRentalCard', () => {
    it('should activate route', async () => {
      const user = userCustomerEntityMock();
      const card = rentalCardEntityMock();
      // @ts-ignore
      card.ownerId = user.id;
      jest.spyOn(rentalCardsRepositoryMock, 'findById').mockResolvedValueOnce(card);

      // @ts-ignore
      expect(await guard.getRentalCard(user, new AggregateId())).toBe(card);
    });

    it('should fail to activate route - user trying to access foreign rental card', async () => {
      const user = userCustomerEntityMock();
      const card = rentalCardEntityMock();
      jest.spyOn(rentalCardsRepositoryMock, 'findById').mockResolvedValueOnce(card);

      // @ts-ignore
      await expect(guard.getRentalCard(user, new AggregateId())).rejects.toThrow(ForbiddenException);
    });
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
