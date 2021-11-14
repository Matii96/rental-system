import { userCustomerEntityMock } from '@rental-system/domain-testing';
import { UserCustomerModel } from './models/user-customer.model';
import { CustomerInputDto } from './dto/input.dto';
import { CustomerOutputDto } from './dto/output.dto';

export const userCustomerModelMock = (user = userCustomerEntityMock()) =>
  <UserCustomerModel>{
    id: user.id,
    base: null,
    agreedToNewsletter: user.agreedToNewsletter,
  };

export const userCustomerInputMock = (user = userCustomerEntityMock()) => {
  const dto = new CustomerInputDto();
  dto.name = user.name;
  dto.email = user.email;
  dto.password = user.getPassword();
  dto.active = user.isActive();
  dto.agreedToNewsletter = user.agreedToNewsletter;
  return dto;
};

export const userCustomerOutputMock = (user = userCustomerEntityMock()) => new CustomerOutputDto(user);
