import { Test, TestingModule } from '@nestjs/testing';
import { userAdminEntityMock } from '@rental-system/domain-testing';
import { userAdminInputMock } from '../admins.fixtures';
import { AdminsService } from '../application/admins.service';
import { AdminsRepository } from '../infrastructure/database/repositories/admins.repository';
import { AdminsController } from './admins.controller';
import { AdminOutputDto } from './dto/output.dto';

describe('AdminsController', () => {
  let controller: AdminsController;
  let adminsRepositoryMock: AdminsRepository;
  let adminsServiceMock: AdminsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminsController],
      providers: [
        {
          provide: AdminsRepository,
          useValue: { findById: jest.fn(() => userAdminEntityMock()) },
        },
        { provide: AdminsService, useValue: { create: jest.fn() } },
      ],
    }).compile();

    controller = module.get(AdminsController);
    adminsRepositoryMock = module.get(AdminsRepository);
    adminsServiceMock = module.get(AdminsService);
  });

  it('should create new admin user', async () => {
    const user = userAdminEntityMock();
    const userOutput = new AdminOutputDto(user);
    jest.spyOn(adminsServiceMock, 'create').mockResolvedValueOnce(userOutput);

    expect(await controller.create(userAdminInputMock(user))).toEqual(userOutput);
    expect(adminsServiceMock.create).toHaveBeenCalledTimes(1);
  });

  it('should get user by id', async () => {
    const user = userAdminEntityMock();
    jest.spyOn(adminsRepositoryMock, 'findById').mockResolvedValueOnce(user);

    expect(await controller.getUserById('id')).toEqual(user);
    expect(adminsRepositoryMock.findById).toHaveBeenCalledTimes(1);
  });
});
