import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { UserAdminEntity } from '@rental-system/domain';
import { userAdminEntityMock } from '@rental-system/domain-testing';
import { UsersConfig } from '../../../infrastructure/config/config.validator';
import { UsersService } from '../../users/application/users.service';
import { AdminsRepository } from '../infrastructure/database/repositories/admins.repository';
import { AdminsFactory } from './factories/admins.factory';
import { AdminsService } from './admins.service';

describe('AdminsService', () => {
  let service: AdminsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ envFilePath: ['.env', 'apps/users/.env'], validate: UsersConfig.validate })],
      providers: [
        AdminsService,
        {
          provide: UsersService,
          useValue: { delete: jest.fn() },
        },
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
