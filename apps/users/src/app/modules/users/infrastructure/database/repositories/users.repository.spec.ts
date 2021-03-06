import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { InvalidLoginException } from '@rental-system/domain';
import { userAdminEntityMock, userCustomerEntityMock } from '@rental-system/domain-testing';
import { SequelizeMock } from '@rental-system/database-storage';
import { AdminsModelFactory } from '../../../../admins/infrastructure/database/factories/admins-model.factory';
import { CustomersModelFactory } from '../../../../customers/infrastructure/database/factories/customers-model.factory';
import { userModelMock } from '../../../users.mocks';
import { UserModel } from '../models/user.model';
import { UsersModelFactory } from '../factories/users-model.factory';
import { UsersRepository } from './users.repository';

describe('UsersRepository', () => {
  let repository: UsersRepository;
  let modelMock: typeof UserModel;
  let modelFactoryMock: UsersModelFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: Sequelize,
          useValue: { transaction: jest.fn((action: () => any) => action()) },
        },
        { provide: getModelToken(UserModel), useClass: SequelizeMock },
        {
          provide: UsersModelFactory,
          useValue: { entityToModel: jest.fn(), modelToEntity: jest.fn() },
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

    repository = module.get(UsersRepository);
    modelMock = module.get(getModelToken(UserModel));
    modelFactoryMock = module.get(UsersModelFactory);
  });

  it('should find queried users', async () => {
    expect(await repository.findAll()).toEqual([]);
  });

  describe('findByLogin', () => {
    it('should find user by name or email', async () => {
      const user = userAdminEntityMock();
      jest.spyOn(modelMock, 'findOne').mockResolvedValueOnce(userModelMock(user));
      jest.spyOn(modelFactoryMock, 'modelToEntity').mockReturnValueOnce(user);

      expect(await repository.findByLogin(user.name)).toEqual(user);
    });

    it('should fail to find user by name or email - user not found', async () => {
      const user = userAdminEntityMock();
      await expect(repository.findByLogin(user.name)).rejects.toThrow(InvalidLoginException);
    });
  });
});
