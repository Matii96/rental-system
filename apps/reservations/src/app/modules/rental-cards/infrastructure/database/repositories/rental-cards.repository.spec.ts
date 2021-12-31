import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { rentalCardEntityMock } from '@rental-system/domain-testing';
import { AggregateId } from '@rental-system/common';
import { InvalidIdException, SequelizeMock } from '@rental-system/database-storage';
import { RentalsRepository } from '../../../../rentals/infrastructure/database/repositories/rentals.repository';
import { rentalCardModelMock } from '../../../rental-cards.mocks';
import { RentalCardModel } from '../models/rental-card.model';
import { RentalCardsModelFactory } from '../factories/rental-cards-model.factory';
import { RentalCardsRepository } from './rental-cards.repository';

describe('RentalCardsRepository', () => {
  let repository: RentalCardsRepository;
  let dbModelMock: typeof RentalCardModel;
  let modelFactoryMock: RentalCardsModelFactory;

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
        {
          provide: RentalsRepository,
          useValue: { findAllActive: jest.fn().mockReturnValue([]) },
        },
      ],
    }).compile();

    repository = module.get(RentalCardsRepository);
    dbModelMock = module.get(getModelToken(RentalCardModel));
    modelFactoryMock = module.get(RentalCardsModelFactory);
  });

  describe('findById()', () => {
    it('should find rental card by id', async () => {
      const card = rentalCardEntityMock();
      await dbModelMock.create(rentalCardModelMock(card));
      jest.spyOn(modelFactoryMock, 'modelToEntity').mockReturnValueOnce(card);

      expect(await repository.findById(card.id)).toEqual(card);
    });

    it('should fail to find by id - invalid id', async () => {
      await expect(repository.findById(new AggregateId('not-id'))).rejects.toThrow(InvalidIdException);
    });
  });
});
