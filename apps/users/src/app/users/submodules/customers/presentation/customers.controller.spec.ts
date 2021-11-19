import { Test, TestingModule } from '@nestjs/testing';
import { userCustomerEntityMock } from '@rental-system/domain-testing';
import { CustomersService } from '../application/customers.service';
import { userCustomerInputMock } from '../customers.fixtures';
import { CustomersRepository } from '../infrastructure/database/repositories/customers.repository';
import { CustomersController } from './customers.controller';
import { CustomerOutputDto } from './dto/output.dto';

describe('CustomersController', () => {
  let controller: CustomersController;
  let customersRepositoryMock: CustomersRepository;
  let customersServiceMock: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersRepository,
          useValue: { findById: jest.fn(() => userCustomerEntityMock()) },
        },
        { provide: CustomersService, useValue: { create: jest.fn() } },
      ],
    }).compile();

    controller = module.get(CustomersController);
    customersRepositoryMock = module.get(CustomersRepository);
    customersServiceMock = module.get(CustomersService);
  });

  it('should create new customer user', async () => {
    const user = userCustomerEntityMock();
    const userOutput = new CustomerOutputDto(user);
    jest.spyOn(customersServiceMock, 'create').mockResolvedValueOnce(userOutput);

    expect(await controller.create(userCustomerInputMock(user))).toEqual(userOutput);
    expect(customersServiceMock.create).toHaveBeenCalledTimes(1);
  });

  it('should get user by id', async () => {
    const user = userCustomerEntityMock();
    jest.spyOn(customersRepositoryMock, 'findById').mockResolvedValueOnce(user);

    expect(await controller.getUserById('id')).toEqual(user);
    expect(customersRepositoryMock.findById).toHaveBeenCalledTimes(1);
  });
});
