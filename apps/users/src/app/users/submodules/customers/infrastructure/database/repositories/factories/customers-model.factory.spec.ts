import { Test, TestingModule } from '@nestjs/testing';
import { userCustomerEntityMock } from '@rental-system/domain-testing';
import { userModelMock } from '../../../../../../users.fixtures';
import { userCustomerModelMock } from '../../../../customers.fixtures';
import { CustomersModelFactory } from './customers-model.factory';

describe('CustomersModelFactory', () => {
  let factory: CustomersModelFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersModelFactory],
    }).compile();

    factory = module.get(CustomersModelFactory);
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
