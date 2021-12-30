import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { UserCustomerEntity } from '@rental-system/domain';
import { userCustomerEntityMock } from '@rental-system/domain-testing';
import { UsersConfig } from '../../../infrastructure/config/config.validator';
import { UsersService } from '../../users/application/users.service';
import { CustomersRepository } from '../infrastructure/database/repositories/customers.repository';
import { CustomersFactory } from './factories/customers.factory';
import { CustomersService } from './customers.service';

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ envFilePath: ['.env', 'apps/users/.env'], validate: UsersConfig.validate })],
      providers: [
        CustomersService,
        {
          provide: UsersService,
          useValue: { delete: jest.fn() },
        },
        {
          provide: CustomersFactory,
          useValue: { create: jest.fn(() => userCustomerEntityMock()) },
        },
        {
          provide: CustomersRepository,
          useValue: { create: jest.fn((user: UserCustomerEntity) => user) },
        },
      ],
    }).compile();

    service = module.get(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
