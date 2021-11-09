import { Test, TestingModule } from '@nestjs/testing';
import { userAdminEntityMock } from '@rental-system/domain-testing';
import { UsersAdminsModelFactory } from './users-admins-model.factory';
import { userAdminModelMock, userModelMock } from '../../users.fixtures';

describe('UsersAdminsModelFactory', () => {
  let factory: UsersAdminsModelFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersAdminsModelFactory],
    }).compile();

    factory = module.get(UsersAdminsModelFactory);
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
