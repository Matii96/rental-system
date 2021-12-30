import { Test, TestingModule } from '@nestjs/testing';
import { userAdminEntityMock } from '@rental-system/domain-testing';
import { userAdminInputMock } from '@rental-system/interfaces';
import { AdminsService } from '../application/admins.service';
import { AdminsRepository } from '../infrastructure/database/repositories/admins.repository';
import { AdminsController } from './admins.controller';
import { AdminOutputDto } from './dto/output.dto';

describe('AdminsController', () => {
  let controller: AdminsController;
  let adminsServiceMock: AdminsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminsController],
      providers: [
        { provide: AdminsRepository, useValue: {} },
        {
          provide: AdminsService,
          useValue: {
            getById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            updateSelf: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get(AdminsController);
    adminsServiceMock = module.get(AdminsService);
  });

  it('should get user by id', async () => {
    const user = userAdminEntityMock();
    expect(controller.getById(user)).toEqual(new AdminOutputDto(user));
  });

  it('should create new admin user', async () => {
    const user = userAdminEntityMock();
    jest.spyOn(adminsServiceMock, 'create').mockResolvedValueOnce(user);

    expect(await controller.create(userAdminInputMock())).toEqual(new AdminOutputDto(user));
    expect(adminsServiceMock.create).toHaveBeenCalledTimes(1);
  });

  it('should update user himself', async () => {
    const user = userAdminEntityMock();
    jest.spyOn(adminsServiceMock, 'updateSelf').mockResolvedValueOnce(user);

    expect(await controller.updateSelf(user, userAdminInputMock())).toEqual(new AdminOutputDto(user));
    expect(adminsServiceMock.updateSelf).toHaveBeenCalledTimes(1);
  });

  it('should update user', async () => {
    const user = userAdminEntityMock();
    jest.spyOn(adminsServiceMock, 'update').mockResolvedValueOnce(user);

    expect(await controller.update(user, userAdminInputMock())).toEqual(new AdminOutputDto(user));
    expect(adminsServiceMock.update).toHaveBeenCalledTimes(1);
  });

  it('should delete user', async () => {
    const user = userAdminEntityMock();
    jest.spyOn(adminsServiceMock, 'delete').mockResolvedValueOnce();

    expect(await controller.delete(user)).toEqual(new AdminOutputDto(user));
    expect(adminsServiceMock.delete).toHaveBeenCalledTimes(1);
  });
});
