import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { userAdminEntityMock } from '@rental-system/domain-testing';
import { IUserRequest } from '../../../users/presentation/interfaces/user-request.interface';
import { CustomersRepository } from '../../infrastructure/database/repositories/customers.repository';
import { CustomersGuard } from './customers.guard';

describe('CustomersGuard', () => {
  let guard: CustomersGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersGuard,
        {
          provide: CustomersRepository,
          useValue: { findById: jest.fn() },
        },
      ],
    }).compile();

    guard = module.get(CustomersGuard);
  });

  it('should activate route', async () => {
    const user = userAdminEntityMock();
    const req = <IUserRequest>(<unknown>{ params: { userId: 'id' } });
    const contextMock = <ExecutionContext>{
      getHandler: () => null,
      getType: () => 'http',
      switchToHttp: () => ({ getRequest: () => req }),
    };
    // @ts-ignore
    jest.spyOn(guard, 'getUser').mockResolvedValueOnce(user);

    expect(await guard.canActivate(contextMock)).toBe(true);
    expect(req.requestUser).toBe(user);
  });
});
