import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { userAdminEntityMock, userCustomerEntityMock } from '@rental-system/domain-testing';
import { SequelizeMock } from '@rental-system/database-storage';
import { UserModel } from '../models/user.model';
import { UsersRepository } from './users.repository';
import { UsersModelFactory } from './factories/users-model.factory';
import { AdminsModelFactory } from '../admins/repositories/factories/admins-model.factory';
import { CustomersModelFactory } from '../customers/repositories/factories/customers-model.factory';

describe('UsersRepository', () => {
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        { provide: getModelToken(UserModel), useClass: SequelizeMock },
        {
          provide: UsersModelFactory,
          useValue: { entityToModel: jest.fn(() => {}), modelToEntity: jest.fn() },
        },
        {
          provide: AdminsModelFactory,
          useValue: { modelToEntity: jest.fn(() => userAdminEntityMock()) },
        },
        {
          provide: CustomersModelFactory,
          useValue: { modelToEntity: jest.fn(() => userCustomerEntityMock()) },
        },
      ],
    }).compile();

    repository = await module.resolve(UsersRepository);
  });

  it('should find queried users', async () => {
    expect(await repository.findAll()).toEqual([]);
  });
});
