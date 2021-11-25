import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { userAdminEntityMock } from '@rental-system/domain-testing';
import { SequelizeMock } from '@rental-system/database-storage';
import { UsersRepository } from '../../../../users/infrastructure/database/repositories/users.repository';
import { userAdminModelMock } from '../../../admins.mocks';
import { UserAdminModel } from '../models/admin.model';
import { AdminsModelFactory } from '../factories/admins-model.factory';
import { AdminsRepository } from './admins.repository';

describe('AdminsRepository', () => {
  let repository: AdminsRepository;
  let usersRepositoryMock: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminsRepository,
        {
          provide: Sequelize,
          useValue: { transaction: jest.fn((action: () => any) => action()) },
        },
        {
          provide: getModelToken(UserAdminModel),
          useClass: SequelizeMock,
        },
        {
          provide: AdminsModelFactory,
          useValue: {
            entityToModel: jest.fn(() => userAdminModelMock()),
            modelToEntity: jest.fn(() => userAdminEntityMock()),
          },
        },
        {
          provide: UsersRepository,
          useValue: { create: jest.fn(), update: jest.fn() },
        },
      ],
    }).compile();

    repository = module.get(AdminsRepository);
    usersRepositoryMock = module.get(UsersRepository);
  });

  it('should create admin user', async () => {
    const user = userAdminEntityMock();
    expect(await repository.create(user)).toEqual(user);
    expect(usersRepositoryMock.create).toHaveBeenCalledTimes(1);
  });

  it('should update admin user', async () => {
    const user = userAdminEntityMock();
    expect(await repository.update(user)).toEqual(user);
    expect(usersRepositoryMock.update).toHaveBeenCalledTimes(1);
  });
});
