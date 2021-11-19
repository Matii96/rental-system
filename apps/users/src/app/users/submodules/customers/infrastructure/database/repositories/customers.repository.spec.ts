import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { userCustomerEntityMock } from '@rental-system/domain-testing';
import { SequelizeMock } from '@rental-system/database-storage';
import { UsersRepository } from 'apps/users/src/app/users/infrastructure/database/repositories/users.repository';
import { UserCustomerModel } from '../models/user-customer.model';
import { userCustomerModelMock } from '../../../customers.fixtures';
import { CustomersModelFactory } from './factories/customers-model.factory';
import { CustomersRepository } from './customers.repository';

describe('CustomersRepository', () => {
  let repository: CustomersRepository;
  let usersRepositoryMock: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersRepository,
        {
          provide: getModelToken(UserCustomerModel),
          useClass: SequelizeMock,
        },
        {
          provide: CustomersModelFactory,
          useValue: {
            entityToModel: jest.fn(() => userCustomerModelMock()),
            modelToEntity: jest.fn(() => userCustomerEntityMock()),
          },
        },
        {
          provide: UsersRepository,
          useValue: { create: jest.fn(), update: jest.fn() },
        },
        {
          provide: Sequelize,
          useValue: { transaction: jest.fn((action: () => any) => action()) },
        },
      ],
    }).compile();

    repository = module.get(CustomersRepository);
    usersRepositoryMock = module.get(UsersRepository);
  });

  it('should create customer user', async () => {
    const user = userCustomerEntityMock();
    expect(await repository.create(user)).toEqual(user);
    expect(usersRepositoryMock.create).toHaveBeenCalledTimes(1);
  });

  it('should update customer user', async () => {
    const user = userCustomerEntityMock();
    expect(await repository.update(user)).toEqual(user);
    expect(usersRepositoryMock.update).toHaveBeenCalledTimes(1);
  });
});
