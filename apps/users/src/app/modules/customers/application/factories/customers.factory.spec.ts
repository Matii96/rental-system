import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { userCustomerEntityMock } from '@rental-system/domain-testing';
import { userCustomerInputMock } from '../../customers.fixtures';
import { CustomersFactory } from './customers.factory';

describe('CustomersFactory', () => {
  let factory: CustomersFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ envFilePath: ['.env', 'apps/users/.env'] })],
      providers: [CustomersFactory],
    }).compile();

    factory = module.get(CustomersFactory);
  });

  it('should create new entity', () => {
    const admin = userCustomerEntityMock();
    const result = factory.create(userCustomerInputMock(admin));
    expect({ name: result.name, email: result.email }).toEqual({ name: admin.name, email: admin.email });
  });
});
