import { Test, TestingModule } from '@nestjs/testing';
import { ICountableData } from '@rental-system/common';
import { UserOutputDto } from './dto/output/output.dto';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepositoryMock: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: { findAll: jest.fn(() => []), count: jest.fn(() => 0) },
        },
      ],
    }).compile();

    service = module.get(UsersService);
    usersRepositoryMock = module.get(UsersRepository);
  });

  it('should get queried users', async () => {
    expect(await service.getAll({})).toEqual(<ICountableData<UserOutputDto>>{ data: [], total: 0 });
    expect(usersRepositoryMock.findAll).toHaveBeenCalledTimes(1);
  });
});
