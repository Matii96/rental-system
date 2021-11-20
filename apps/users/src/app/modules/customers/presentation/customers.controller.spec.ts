import { Test, TestingModule } from '@nestjs/testing';
import { userCustomerEntityMock } from '@rental-system/domain-testing';
import { userCustomerInputMock } from '../customers.fixtures';
import { CustomersService } from '../application/customers.service';
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
          useValue: { findById: jest.fn(), delete: jest.fn() },
        },
        {
          provide: CustomersService,
          useValue: { create: jest.fn(), update: jest.fn(), updateSelf: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get(CustomersController);
    customersRepositoryMock = module.get(CustomersRepository);
    customersServiceMock = module.get(CustomersService);
  });

  it('should get user by id', async () => {
    const user = userCustomerEntityMock();
    jest.spyOn(customersRepositoryMock, 'findById').mockResolvedValueOnce(user);

    expect(await controller.getById('id')).toEqual(new CustomerOutputDto(user));
    expect(customersRepositoryMock.findById).toHaveBeenCalledTimes(1);
  });

  it('should create new customer user', async () => {
    const user = userCustomerEntityMock();
    jest.spyOn(customersServiceMock, 'create').mockResolvedValueOnce(user);

    expect(await controller.create(userCustomerInputMock(user))).toEqual(new CustomerOutputDto(user));
    expect(customersServiceMock.create).toHaveBeenCalledTimes(1);
  });

  it('should update user himself', async () => {
    const user = userCustomerEntityMock();
    jest.spyOn(customersServiceMock, 'updateSelf').mockResolvedValueOnce(user);

    expect(await controller.updateSelf(user, userCustomerInputMock(user))).toEqual(new CustomerOutputDto(user));
    expect(customersServiceMock.updateSelf).toHaveBeenCalledTimes(1);
  });

  it('should update user', async () => {
    const user = userCustomerEntityMock();
    jest.spyOn(customersServiceMock, 'update').mockResolvedValueOnce(user);

    expect(await controller.update(user, userCustomerInputMock(user))).toEqual(new CustomerOutputDto(user));
    expect(customersServiceMock.update).toHaveBeenCalledTimes(1);
  });

  it('should delete user', async () => {
    const user = userCustomerEntityMock();
    jest.spyOn(customersRepositoryMock, 'delete').mockResolvedValueOnce(user);

    expect(await controller.delete(user)).toEqual(new CustomerOutputDto(user));
    expect(customersRepositoryMock.delete).toHaveBeenCalledTimes(1);
  });

  it('should get user entity by id', async () => {
    const user = userCustomerEntityMock();
    jest.spyOn(customersRepositoryMock, 'findById').mockResolvedValueOnce(user);

    expect(await controller.getEntityById('id')).toEqual(user);
    expect(customersRepositoryMock.findById).toHaveBeenCalledTimes(1);
  });
});
