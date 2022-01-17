import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { AggregateId } from '@rental-system/common';
import { MicroservicesEnum } from '../../microservices.enum';
import { UsersMicroserviceClient } from './users.microservice-client';

describe('UsersMicroserviceClient', () => {
  let client: UsersMicroserviceClient;
  let usersClientMock: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersMicroserviceClient,
        {
          provide: MicroservicesEnum.USERS,
          useValue: { send: jest.fn() },
        },
      ],
    }).compile();

    client = module.get(UsersMicroserviceClient);
    usersClientMock = module.get(MicroservicesEnum.USERS);
  });

  it('should get user by id', async () => {
    const user = { id: new AggregateId() };
    jest.spyOn(usersClientMock, 'send').mockReturnValueOnce(of(user));

    expect(await client.getById(user.id)).toEqual(user);
    expect(usersClientMock.send).toHaveBeenCalledTimes(1);
  });
});
