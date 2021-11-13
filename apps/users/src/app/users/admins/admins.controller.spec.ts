import { Test, TestingModule } from '@nestjs/testing';
import { userAdminEntityMock } from '@rental-system/domain-testing';
import { userAdminInputMock } from './admins.fixtures';
import { AdminsController } from './admins.controller';
import { AdminOutputDto } from './dto/output.dto';
import { AdminsService } from './admins.service';

describe('AdminsController', () => {
  let controller: AdminsController;
  let adminsServiceMock: AdminsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminsController],
      providers: [{ provide: AdminsService, useValue: { create: jest.fn() } }],
    }).compile();

    controller = module.get(AdminsController);
    adminsServiceMock = module.get(AdminsService);
  });

  it('should create new admin user', async () => {
    const user = userAdminEntityMock();
    const userOutput = new AdminOutputDto(user);
    jest.spyOn(adminsServiceMock, 'create').mockResolvedValueOnce(userOutput);

    expect(await controller.create(userAdminInputMock(user))).toEqual(userOutput);
    expect(adminsServiceMock.create).toHaveBeenCalledTimes(1);
  });
});
