import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { AggregateId, ICountableData } from '@rental-system/common';
import { userAdminEntityMock } from '@rental-system/domain-testing';
import { UsersService } from '../application/users.service';
import { UserOutputDto } from './dto/output/output.dto';
import { UsersController } from './users.controller';
import { UserLoginOutputDto } from './dto/output/login-output.dto';
import { UserGenericOutputDto } from './dto/output/generic-output.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let usersServiceMock: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getById: jest.fn(),
            getAll: jest.fn((): ICountableData<UserOutputDto> => ({ data: [], total: 0 })),
            login: jest.fn().mockResolvedValue({ user: userAdminEntityMock(), jwt: 'jwt' }),
          },
        },
      ],
    }).compile();

    controller = module.get(UsersController);
    usersServiceMock = module.get(UsersService);
  });

  it('should get user by id', async () => {
    const user = userAdminEntityMock();
    jest.spyOn(usersServiceMock, 'getById').mockResolvedValueOnce(user);

    expect(await controller.getById(new AggregateId('id'))).toEqual(new UserGenericOutputDto(user));
    expect(usersServiceMock.getById).toHaveBeenCalledTimes(1);
  });

  it('should get all queried users', async () => {
    const req = <Request>{ res: <any>{ setHeader: jest.fn() } };
    expect(await controller.list(req, { toOptions: jest.fn() })).toEqual([]);
    expect(usersServiceMock.getAll).toHaveBeenCalledTimes(1);
  });

  it('should login user', async () => {
    expect(await controller.login({ nameOrEmail: 'user', password: 'password' })).toBeInstanceOf(UserLoginOutputDto);
    expect(usersServiceMock.login).toHaveBeenCalledTimes(1);
  });
});
