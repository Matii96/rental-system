import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { AggregateId } from '@rental-system/common';
import { RentalCardEntity } from '@rental-system/domain';
import { rentalCardEntityMock, rentalEntityMock, userCustomerEntityMock } from '@rental-system/domain-testing';
import { ReservationsMicroserviceClient } from '@rental-system/microservices';
import { RentalsRepository } from '../../infrastructure/database/repositories/rentals.repository';
import { IRentalRequest } from '../interfaces/rental-card-request.interface';
import { RentalsGuard } from './rentals.guard';

describe('RentalsGuard', () => {
  let guard: RentalsGuard;
  let reservationsClientMock: ReservationsMicroserviceClient;
  let rentalsRepositoryMock: RentalsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentalsGuard,
        {
          provide: ReservationsMicroserviceClient,
          useValue: { getCardById: jest.fn() },
        },
        {
          provide: RentalsRepository,
          useValue: { findById: jest.fn() },
        },
      ],
    }).compile();

    guard = module.get(RentalsGuard);
    reservationsClientMock = module.get(ReservationsMicroserviceClient);
    rentalsRepositoryMock = module.get(RentalsRepository);
  });

  describe('getRental', () => {
    it('should activate route', async () => {
      const user = userCustomerEntityMock();
      const rental = rentalEntityMock();
      jest.spyOn(rentalsRepositoryMock, 'findById').mockResolvedValueOnce(rental);
      jest
        .spyOn(reservationsClientMock, 'getCardById')
        .mockResolvedValueOnce(plainToClass(RentalCardEntity, { ...rentalCardEntityMock(), ownerId: user.id }));

      // @ts-ignore
      expect(await guard.getRental(user, new AggregateId())).toBe(rental);
    });

    it('should fail to activate route - user trying to access foreign rental', async () => {
      const user = userCustomerEntityMock();
      const rental = rentalEntityMock();
      jest.spyOn(rentalsRepositoryMock, 'findById').mockResolvedValueOnce(rental);
      jest.spyOn(reservationsClientMock, 'getCardById').mockResolvedValueOnce(rentalCardEntityMock());

      // @ts-ignore
      await expect(guard.getRental(user, new AggregateId())).rejects.toThrow(ForbiddenException);
    });
  });

  it('should activate route', async () => {
    const rental = rentalEntityMock();
    const req = <IRentalRequest>(<unknown>{ params: { rentalId: 'id' } });
    const contextMock = <ExecutionContext>{
      getHandler: () => null,
      getType: () => 'http',
      switchToHttp: () => ({ getRequest: () => req }),
    };
    // @ts-ignore
    jest.spyOn(guard, 'getRental').mockResolvedValueOnce(rental);

    expect(await guard.canActivate(contextMock)).toBe(true);
    expect(req.rental).toBe(rental);
  });
});
