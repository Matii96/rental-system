import { ConfigModule } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { userAdminEntityMock } from '@rental-system/domain-testing';
import { MicroservicesEnum } from '@rental-system/microservices';
import { of } from 'rxjs';
import { AuthUserJwtDto } from '../dto/auth-user-jwt.dto';
import { JwtStrategy } from './user-jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let clientProxyMock: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ envFilePath: '.env' })],
      providers: [
        JwtStrategy,
        {
          provide: MicroservicesEnum.USERS,
          useValue: { send: jest.fn() },
        },
      ],
    }).compile();

    strategy = module.get(JwtStrategy);
    clientProxyMock = module.get(MicroservicesEnum.USERS);
  });

  describe('validate()', () => {
    it('should allow user access', async () => {
      const user = userAdminEntityMock();
      jest.spyOn(clientProxyMock, 'send').mockReturnValueOnce(of(user));

      expect(await strategy.validate(new AuthUserJwtDto(user))).toEqual(user);
    });

    it('should disallow user access - user not active', async () => {
      const user = userAdminEntityMock();
      user.deactivate();
      jest.spyOn(clientProxyMock, 'send').mockReturnValueOnce(of(user));

      expect(await strategy.validate(new AuthUserJwtDto(user))).toBeUndefined();
    });
  });
});
