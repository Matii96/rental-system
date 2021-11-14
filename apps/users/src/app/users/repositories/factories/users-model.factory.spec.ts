import { Test, TestingModule } from '@nestjs/testing';
import { userAdminEntityMock, userCustomerEntityMock } from '@rental-system/domain-testing';
import { AdminsModelFactory } from '../../admins/repositories/factories/admins-model.factory';
import { CustomersModelFactory } from '../../customers/repositories/factories/customers-model.factory';
import { InvalidUserClassException } from '../../exceptions/invalid-user-class.exception';
import { userModelMock } from '../../users.fixtures';
import { UsersModelFactory } from './users-model.factory';

describe('UsersModelFactory', () => {
  let factory: UsersModelFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersModelFactory,
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

    factory = module.get(UsersModelFactory);
  });

  it('should map entity to model', () => {
    const user = userAdminEntityMock();
    expect(factory.entityToModel(user)).toEqual(userModelMock(user));
  });

  it('should map model to entity', () => {
    const user = userAdminEntityMock();
    expect(() => factory.modelToEntity(userModelMock(user))).toThrow(InvalidUserClassException);
  });
});
