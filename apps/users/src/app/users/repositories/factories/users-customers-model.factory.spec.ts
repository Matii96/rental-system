import { Test, TestingModule } from '@nestjs/testing';
import { userCustomerEntityMock } from '@rental-system/domain-testing';
import { UsersCustomersModelFactory } from './users-customers-model.factory';
import { userCustomerModelMock, userModelMock } from '../../users.fixtures';

describe('UsersCustomersModelFactory', () => {
  let factory: UsersCustomersModelFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersCustomersModelFactory],
    }).compile();

    factory = module.get(UsersCustomersModelFactory);
  });

  it('should map entity to model', () => {
    const user = userCustomerEntityMock();
    expect(factory.entityToModel(user)).toEqual(userCustomerModelMock(user));
  });

  it('should map model to entity', () => {
    const user = userCustomerEntityMock();
    expect(factory.modelToEntity(userCustomerModelMock(user), userModelMock(user))).toEqual(user);
  });
});
