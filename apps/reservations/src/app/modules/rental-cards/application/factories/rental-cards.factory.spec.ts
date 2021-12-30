import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { RentalCardEntity, RentalPolicies } from '@rental-system/domain';
import { RentalCardsFactory } from './rental-cards.factory';

describe('RentalCardsFactory', () => {
  let factory: RentalCardsFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ envFilePath: ['.env', 'apps/reservations/.env'] })],
      providers: [RentalCardsFactory],
    }).compile();

    factory = module.get(RentalCardsFactory);
  });

  it('should create new entity', () => {
    expect(
      factory.create({ ownerId: 'owenr-id', rentalPolicyType: <RentalPolicies>Object.keys(RentalPolicies)[0] })
    ).toBeInstanceOf(RentalCardEntity);
  });
});
