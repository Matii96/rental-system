import { Test, TestingModule } from '@nestjs/testing';
import { userAdminEntityMock } from '@rental-system/domain-testing';
import { userAdminInputMock } from '../admins.fixtures';
import { AdminsFactory } from './admins-model.factory';

describe('AdminsFactory', () => {
  let factory: AdminsFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminsFactory],
    }).compile();

    factory = module.get(AdminsFactory);
  });

  it('should create new entity', () => {
    const admin = userAdminEntityMock();
    const result = factory.create(userAdminInputMock(admin));
    expect({ name: result.name, email: result.email }).toEqual({ name: admin.name, email: admin.email });
  });
});
