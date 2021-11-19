import { userAdminEntityMock } from '@rental-system/domain-testing';
import { UserAdminModel } from './infrastructure/database/models/admin.model';
import { AdminInputSelfDto } from './presentation/dto/input/input-self.dto';
import { AdminInputDto } from './presentation/dto/input/input.dto';
import { AdminOutputDto } from './presentation/dto/output.dto';

export const userAdminModelMock = (user = userAdminEntityMock()) =>
  <UserAdminModel>{
    id: user.id,
    base: null,
    agreedToNewsletter: user.agreedToNewsletter,
    salary: user.salary,
  };

export const userAdminInputMock = (user = userAdminEntityMock()) => {
  const dto = new AdminInputDto();
  dto.name = user.name;
  dto.email = user.email;
  dto.password = user.getPassword();
  dto.active = user.isActive();
  dto.salary = user.salary;
  dto.agreedToNewsletter = user.agreedToNewsletter;
  return dto;
};

export const userAdminInputSelfMock = (user = userAdminEntityMock()) => {
  const dto = new AdminInputSelfDto();
  dto.name = user.name;
  dto.email = user.email;
  dto.password = user.getPassword();
  dto.agreedToNewsletter = user.agreedToNewsletter;
  return dto;
};

export const userAdminOutputMock = (user = userAdminEntityMock()) => new AdminOutputDto(user);
