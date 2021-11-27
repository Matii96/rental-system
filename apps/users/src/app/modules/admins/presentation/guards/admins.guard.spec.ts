import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { userAdminEntityMock } from '@rental-system/domain-testing';
import { IUserRequest } from '../../../users/presentation/interfaces/user-request.interface';
import { AdminsRepository } from '../../infrastructure/database/repositories/admins.repository';
import { AdminsGuard } from './admins.guard';

describe('AdminsGuard', () => {
  let guard: AdminsGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminsGuard,
        {
          provide: AdminsRepository,
          useValue: { findById: jest.fn() },
        },
      ],
    }).compile();

    guard = module.get(AdminsGuard);
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
