import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { rentalCardEntityMock } from '@rental-system/domain-testing';
import { SequelizeMock } from '@rental-system/database-storage';
import { rentalCardModelMock } from '../../../rental-cards.mocks';
import { RentalCardModel } from '../models/rental-card.model';
import { RentalCardsModelFactory } from '../factories/rental-cards-model.factory';
import { RentalCardsRepository } from './rental-cards.repository';

describe('RentalCardsRepository', () => {
  let repository: RentalCardsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentalCardsRepository,
        {
          provide: Sequelize,
          useValue: { transaction: jest.fn((action: () => any) => action()) },
        },
        {
          provide: getModelToken(RentalCardModel),
          useClass: SequelizeMock,
        },
        {
          provide: RentalCardsModelFactory,
          useValue: {
            entityToModel: jest.fn(() => rentalCardModelMock(rentalCardEntityMock())),
            modelToEntity: jest.fn(() => rentalCardEntityMock()),
          },
        },
      ],
    }).compile();

    repository = module.get(RentalCardsRepository);
  });

  it('should find queried availability', async () => {
    expect(await repository.findAll()).toEqual([]);
  });
});
