import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { rentalEntityMock } from '@rental-system/domain-testing';
import { ReservationsConfig } from '../../../../../infrastructure/config/config.validator';
import { rentalModelMock } from '../../../rentals.mocks';
import { RentalsModelFactory } from './rentals-model.factory';

describe('RentalsModelFactory', () => {
  let factory: RentalsModelFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env', 'apps/reservations/.env'],
          validate: ReservationsConfig.validate,
        }),
      ],
      providers: [RentalsModelFactory],
    }).compile();

    factory = module.get(RentalsModelFactory);
  });

  it('should map entity to model', () => {
    const rental = rentalEntityMock();
    expect(factory.entityToModel(rental)).toEqual(rentalModelMock(rental));
  });

  it('should map model to entity', () => {
    const rental = rentalEntityMock();
    const { id } = factory.modelToEntity(rentalModelMock(rental));
    expect(id).toEqual(rental.id);
  });
});
