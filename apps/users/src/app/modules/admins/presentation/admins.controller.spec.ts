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
          useValue: { findById: jest.fn(), delete: jest.fn() },
        },
        {
          provide: AdminsService,
          useValue: { create: jest.fn(), update: jest.fn(), updateSelf: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get(AdminsController);
    adminsRepositoryMock = module.get(AdminsRepository);
    adminsServiceMock = module.get(AdminsService);
  });

  it('should get user by id', async () => {
    const user = userAdminEntityMock();
    jest.spyOn(adminsRepositoryMock, 'findById').mockResolvedValueOnce(user);

    expect(await controller.getById('id')).toEqual(new AdminOutputDto(user));
    expect(adminsRepositoryMock.findById).toHaveBeenCalledTimes(1);
  });

  it('should create new admin user', async () => {
    const user = userAdminEntityMock();
    jest.spyOn(adminsServiceMock, 'create').mockResolvedValueOnce(user);

    expect(await controller.create(userAdminInputMock(user))).toEqual(new AdminOutputDto(user));
    expect(adminsServiceMock.create).toHaveBeenCalledTimes(1);
  });

  it('should update user himself', async () => {
    const user = userAdminEntityMock();
    jest.spyOn(adminsServiceMock, 'updateSelf').mockResolvedValueOnce(user);

    expect(await controller.updateSelf(user, userAdminInputMock(user))).toEqual(new AdminOutputDto(user));
    expect(adminsServiceMock.updateSelf).toHaveBeenCalledTimes(1);
  });

  it('should update user', async () => {
    const user = userAdminEntityMock();
    jest.spyOn(adminsServiceMock, 'update').mockResolvedValueOnce(user);

    expect(await controller.update(user, userAdminInputMock(user))).toEqual(new AdminOutputDto(user));
    expect(adminsServiceMock.update).toHaveBeenCalledTimes(1);
  });

  it('should delete user', async () => {
    const user = userAdminEntityMock();
    jest.spyOn(adminsRepositoryMock, 'delete').mockResolvedValueOnce(user);

    expect(await controller.delete(user)).toEqual(new AdminOutputDto(user));
    expect(adminsRepositoryMock.delete).toHaveBeenCalledTimes(1);
  });

  it('should get user entity by id', async () => {
    const user = userAdminEntityMock();
    jest.spyOn(adminsRepositoryMock, 'findById').mockResolvedValueOnce(user);

    expect(await controller.getEntityById('id')).toEqual(user);
    expect(adminsRepositoryMock.findById).toHaveBeenCalledTimes(1);
  });
});
