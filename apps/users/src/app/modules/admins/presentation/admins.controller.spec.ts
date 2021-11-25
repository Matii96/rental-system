import { Test, TestingModule } from '@nestjs/testing';
import { userAdminEntityMock } from '@rental-system/domain-testing';
import { userAdminInputMock } from '../admins.fixtures';
import { AdminsService } from '../application/admins.service';
import { AdminsController } from './admins.controller';
import { AdminOutputDto } from './dto/output.dto';

describe('AdminsController', () => {
  let controller: AdminsController;
  let adminsServiceMock: AdminsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminsController],
      providers: [
        {
          provide: AdminsService,
          useValue: { create: jest.fn(), update: jest.fn(), updateSelf: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get(AdminsController);
    adminsServiceMock = module.get(AdminsService);
  });

  it('should get user by id', async () => {
    const user = userAdminEntityMock();
    jest.spyOn(adminsServiceMock, 'getById').mockResolvedValueOnce(user);

    expect(await controller.getById('id')).toEqual(new AdminOutputDto(user));
    expect(adminsServiceMock.getById).toHaveBeenCalledTimes(1);
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
    jest.spyOn(adminsServiceMock, 'delete').mockResolvedValueOnce();

    expect(await controller.delete(user)).toEqual(new AdminOutputDto(user));
    expect(adminsServiceMock.delete).toHaveBeenCalledTimes(1);
  });

  it('should get user entity by id', async () => {
    const user = userAdminEntityMock();
    jest.spyOn(adminsServiceMock, 'getById').mockResolvedValueOnce(user);

    expect(await controller.getEntityById('id')).toEqual(user);
    expect(adminsServiceMock.getById).toHaveBeenCalledTimes(1);
  });
});
