import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AggregateId } from '@rental-system/common';
import { rentalEntityMock } from '@rental-system/domain-testing';
import { SequelizeMock } from '@rental-system/database-storage';
import { rentalModelMock } from '../../../rentals.mocks';
import { RentalsModelFactory } from '../factories/rentals-model.factory';
import { RentalModel } from '../models/rental.model';
import { RentalsRepository } from './rentals.repository';

describe('RentalsRepository', () => {
  let repository: RentalsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentalsRepository,
        {
          provide: Sequelize,
          useValue: { transaction: jest.fn((action: () => any) => action()) },
        },
        {
          provide: getModelToken(RentalModel),
          useClass: SequelizeMock,
        },
        {
          provide: RentalsModelFactory,
          useValue: {
            entityToModel: jest.fn(() => rentalModelMock(rentalEntityMock())),
            modelToEntity: jest.fn(() => rentalEntityMock()),
          },
        },
      ],
    }).compile();

    repository = module.get(RentalsRepository);
  });

  it('should find active rentals for rental card', async () => {
    expect(await repository.findAllActive(new AggregateId('id'))).toEqual([]);
  });
});
