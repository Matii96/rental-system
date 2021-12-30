import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ICountableData } from '@rental-system/common';
import { InvalidLoginException, IUser } from '@rental-system/domain';
import { userAdminEntityMock } from '@rental-system/domain-testing';
import { ReservationsMicroserviceClient } from '@rental-system/microservices';
import { UsersRepository } from '../infrastructure/database/repositories/users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepositoryMock: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '60s' } })],
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            transaction: jest.fn((action: () => any) => action()),
            findAll: jest.fn(() => []),
            count: jest.fn(() => 0),
            findByLogin: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: ReservationsMicroserviceClient,
          useValue: { unregisterCard: jest.fn().mockResolvedValue('ok') },
        },
      ],
    }).compile();

    service = module.get(UsersService);
    usersRepositoryMock = module.get(UsersRepository);
  });

  it('should get queried users', async () => {
    expect(await service.getAll({})).toEqual(<ICountableData<IUser>>{ data: [], total: 0 });
    expect(usersRepositoryMock.findAll).toHaveBeenCalledTimes(1);
  });

  describe('login()', () => {
    const password = 'password';

    it('should login user', async () => {
      const user = userAdminEntityMock();
      user.name = 'user';
      user.setPassword(password, 8);
      jest.spyOn(usersRepositoryMock, 'findByLogin').mockResolvedValueOnce(user);

      const result = await service.login({ nameOrEmail: user.name, password });
      expect(result.jwt).toBeDefined();
      expect(result).toEqual({ user, jwt: result.jwt });
    });

    it('should fail to login user - invalid password', async () => {
      const user = userAdminEntityMock();
      user.name = 'user';
      user.setPassword(password, 8);
      jest.spyOn(usersRepositoryMock, 'findByLogin').mockResolvedValueOnce(user);

      await expect(
        service.login({
          nameOrEmail: user.name,
          password: 'wrong-password',
        })
      ).rejects.toThrow(InvalidLoginException);
    });
  });

  it('should remove user', async () => {
    const user = userAdminEntityMock();
    expect(await service.delete(user)).toEqual(user);
  });
});
