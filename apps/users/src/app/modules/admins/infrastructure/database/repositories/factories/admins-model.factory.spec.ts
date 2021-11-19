import { Test, TestingModule } from '@nestjs/testing';
import { userAdminEntityMock } from '@rental-system/domain-testing';
import { userModelMock } from 'apps/users/src/app/modules/users/users.fixtures';
import { userAdminModelMock } from '../../../../admins.fixtures';
import { AdminsModelFactory } from './admins-model.factory';

describe('AdminsModelFactory', () => {
  let factory: AdminsModelFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminsModelFactory],
    }).compile();

    factory = module.get(AdminsModelFactory);
  });

  it('should map entity to model', () => {
    const user = userAdminEntityMock();
    expect(factory.entityToModel(user)).toEqual(userAdminModelMock(user));
  });

  it('should map model to entity', () => {
    const user = userAdminEntityMock();
    expect(factory.modelToEntity(userAdminModelMock(user), userModelMock(user))).toEqual(user);
  });
});
