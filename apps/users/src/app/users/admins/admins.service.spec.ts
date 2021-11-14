import { Test, TestingModule } from '@nestjs/testing';
import { UserAdminEntity } from '@rental-system/domain';
import { userAdminEntityMock } from '@rental-system/domain-testing';
import { AdminsFactory } from './factories/admins.factory';
import { AdminsRepository } from './repositories/admins.repository';
import { AdminsService } from './admins.service';

describe('AdminsService', () => {
  let service: AdminsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminsService,
        {
          provide: AdminsFactory,
          useValue: { create: jest.fn(() => userAdminEntityMock()) },
        },
        {
          provide: AdminsRepository,
          useValue: { create: jest.fn((user: UserAdminEntity) => user) },
        },
      ],
    }).compile();

    service = module.get(AdminsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
