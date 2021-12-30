import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { rentalCardEntityMock, rentalEntityMock } from '@rental-system/domain-testing';
import { ReservationsConfig } from '../../../../../infrastructure/config/config.validator';
import { rentalCardModelMock } from '../../../rental-cards.mocks';
import { RentalCardsModelFactory } from './rental-cards-model.factory';

describe('RentalCardsModelFactory', () => {
  let factory: RentalCardsModelFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env', 'apps/reservations/.env'],
          validate: ReservationsConfig.validate,
        }),
      ],
      providers: [RentalCardsModelFactory],
    }).compile();

    factory = module.get(RentalCardsModelFactory);
  });

  it('should map entity to model', () => {
    const rentalCard = rentalCardEntityMock();
    expect(factory.entityToModel(rentalCard)).toEqual(rentalCardModelMock(rentalCard));
  });

  it('should map model to entity', () => {
    const rentals = [rentalEntityMock(), rentalEntityMock()];
    const rentalCard = rentalCardEntityMock(rentals.map((rental) => rental.id));
    expect(factory.modelToEntity(rentalCardModelMock(rentalCard), rentals)).toEqual(rentalCard);
  });
});
