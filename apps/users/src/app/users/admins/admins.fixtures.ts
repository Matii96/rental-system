import { userAdminEntityMock } from '@rental-system/domain-testing';
import { AdminInputDto } from './dto/input.dto';
import { AdminOutputDto } from './dto/output.dto';
import { UserAdminModel } from './models/admin.model';

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

export const userAdminOutputMock = (user = userAdminEntityMock()) => new AdminOutputDto(user);
