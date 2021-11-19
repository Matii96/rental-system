import { userCustomerEntityMock } from '@rental-system/domain-testing';
import { CustomerOutputDto } from './presentation/dto/output.dto';
import { CustomerInputDto } from './presentation/dto/input/input.dto';
import { CustomerInputSelfDto } from './presentation/dto/input/input-self.dto';
import { UserCustomerModel } from './infrastructure/database/models/user-customer.model';

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

export const userCustomerInputSelfMock = (user = userCustomerEntityMock()) => {
  const dto = new CustomerInputSelfDto();
  dto.name = user.name;
  dto.email = user.email;
  dto.password = user.getPassword();
  dto.agreedToNewsletter = user.agreedToNewsletter;
  return dto;
};

export const userCustomerOutputMock = (user = userCustomerEntityMock()) => new CustomerOutputDto(user);