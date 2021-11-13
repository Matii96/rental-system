import { Test, TestingModule } from '@nestjs/testing';
import { userAdminEntityMock } from '@rental-system/domain-testing';
import { AdminsService } from './admins.service';

describe('AdminsService', () => {
  let service: AdminsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminsService,
        {
          provide: AdminsService,
          useValue: { create: jest.fn(() => userAdminEntityMock()) },
        },
      ],
    }).compile();

    service = module.get(AdminsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
