import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { userAdminInputMock } from '@rental-system/dto-interfaces';
import { AdminsFactory } from './admins.factory';

describe('AdminsFactory', () => {
  let factory: AdminsFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ envFilePath: ['.env', 'apps/users/.env'] })],
      providers: [AdminsFactory],
    }).compile();

    factory = module.get(AdminsFactory);
  });

  it('should create new entity', () => {
    const adminData = userAdminInputMock();
    const result = factory.create(adminData);
    expect({ name: result.name, email: result.email }).toEqual({ name: adminData.name, email: adminData.email });
  });
});
