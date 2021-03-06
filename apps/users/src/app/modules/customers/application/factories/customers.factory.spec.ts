import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { userCustomerInputMock } from '@rental-system/dto-testing';
import { UsersConfig } from '../../../../infrastructure/config/config.validator';
import { CustomersFactory } from './customers.factory';

describe('CustomersFactory', () => {
  let factory: CustomersFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ envFilePath: ['.env', 'apps/users/.env'], validate: UsersConfig.validate })],
      providers: [CustomersFactory],
    }).compile();

    factory = module.get(CustomersFactory);
  });

  it('should create new entity', () => {
    const customerData = userCustomerInputMock();
    const result = factory.create(customerData);
    expect({ name: result.name, email: result.email }).toEqual({ name: customerData.name, email: customerData.email });
  });
});
