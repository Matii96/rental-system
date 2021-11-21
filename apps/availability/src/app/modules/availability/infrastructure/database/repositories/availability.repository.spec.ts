import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { availabilityEntityMock } from '@rental-system/domain-testing';
import { SequelizeMock } from '@rental-system/database-storage';
import { AvailabilityModelFactory } from '../factories/availability-model.factory';
import { AvailabilityModel } from '../models/availability.model';
import { AvailabilityRepository } from './availability.repository';

describe('AvailabilityRepository', () => {
  let repository: AvailabilityRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvailabilityRepository,
        {
          provide: getModelToken(AvailabilityModel),
          useClass: SequelizeMock,
        },
        {
          provide: AvailabilityModelFactory,
          useValue: {
            entityToModel: jest.fn(() => availabilityEntityMock()),
            modelToEntity: jest.fn(() => availabilityEntityMock()),
          },
        },
      ],
    }).compile();

    repository = module.get(AvailabilityRepository);
  });

  it('should find queried availability', async () => {
    expect(await repository.findAll()).toEqual([]);
  });
});
