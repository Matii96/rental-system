import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { userAdminEntityMock } from '@rental-system/domain-testing';
import { UsersMicroserviceClient } from '@rental-system/microservices';
import { AuthUserJwtDto } from '../dto/auth-user-jwt.dto';
import { JwtStrategy } from './user-jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let clientProxyMock: UsersMicroserviceClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ envFilePath: '.env' })],
      providers: [
        JwtStrategy,
        {
          provide: UsersMicroserviceClient,
          useValue: { getById: jest.fn() },
        },
      ],
    }).compile();

    strategy = module.get(JwtStrategy);
    clientProxyMock = module.get(UsersMicroserviceClient);
  });

  describe('validate()', () => {
    it('should allow user access', async () => {
      const user = userAdminEntityMock();
      jest.spyOn(clientProxyMock, 'getById').mockResolvedValueOnce(user);

      expect(await strategy.validate(new AuthUserJwtDto(user))).toEqual(user);
    });

    it('should disallow user access - user not active', async () => {
      const user = userAdminEntityMock();
      user.deactivate();
      jest.spyOn(clientProxyMock, 'getById').mockResolvedValueOnce(user);

      expect(await strategy.validate(new AuthUserJwtDto(user))).toBeUndefined();
    });
  });
});
