import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { UserAdminEntity } from '@rental-system/domain';
import { userAdminEntityMock } from '@rental-system/domain-testing';
import { UserAuthorizationGuard } from './user-authorization.guard';

describe('UserAuthorizationGuard', () => {
  let guard: UserAuthorizationGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAuthorizationGuard,
        {
          provide: Reflector,
          useValue: { get: jest.fn(() => []) },
        },
      ],
    }).compile();

    guard = module.get(UserAuthorizationGuard);
  });

  describe('checkAccess()', () => {
    it('should allow user access', () => {
      const user = userAdminEntityMock();
      // @ts-ignore
      expect(guard.checkAccess(user, [UserAdminEntity])).toBe(true);
    });

    it('should disallow user access - no matching class', () => {
      const user = userAdminEntityMock();
      const userClassMock = class {
        someMethod() {}
      };

      // @ts-ignore
      expect(guard.checkAccess(user, [() => userClassMock])).toBe(false);
    });
  });

  it('should allow to activate', () => {
    const contextMock = <ExecutionContext>{
      getHandler: () => null,
      getType: () => 'http',
      switchToHttp: () => ({ getRequest: () => ({ user: null }) }),
    };
    // @ts-ignore
    jest.spyOn(guard, 'checkAccess').mockReturnValueOnce(true);

    expect(guard.canActivate(contextMock)).toBe(true);
  });
});
