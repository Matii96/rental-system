import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { ICountableData } from '@rental-system/common';
import { UserOutputDto } from './dto/output/output.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersServiceMock: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: { getAll: jest.fn((): ICountableData<UserOutputDto> => ({ data: [], total: 0 })) },
        },
      ],
    }).compile();

    controller = module.get(UsersController);
    usersServiceMock = module.get(UsersService);
  });

  it('should get all queried users', async () => {
    const req = <Request>{ res: <any>{ setHeader: jest.fn() } };
    expect(await controller.list(req, { toOptions: jest.fn() })).toEqual([]);
    expect(usersServiceMock.getAll).toHaveBeenCalledTimes(1);
  });
});
