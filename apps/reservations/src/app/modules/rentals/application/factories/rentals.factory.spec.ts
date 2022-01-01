import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { RentalEntity } from '@rental-system/domain';
import { ReservationsConfig } from '../../../../infrastructure/config/config.validator';
import { RentalsFactory } from './rentals.factory';

describe('RentalFactory', () => {
  let factory: RentalsFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env', 'apps/reservations/.env'],
          validate: ReservationsConfig.validate,
        }),
      ],
      providers: [RentalsFactory],
    }).compile();

    factory = module.get(RentalsFactory);
  });

  it('should create new entity', () => {
    expect(factory.create({ cardId: 'card-id', itemId: 'item-id', expectedReturnDate: new Date() })).toBeInstanceOf(
      RentalEntity
    );
  });
});
