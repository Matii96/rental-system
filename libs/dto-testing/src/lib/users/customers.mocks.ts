import { datatype, name, internet } from 'faker';
import { plainToClass } from 'class-transformer';
import { CustomerInputDto, CustomerInputSelfDto } from '@rental-system/dto';

export const userCustomerInputMock = () =>
  plainToClass(CustomerInputDto, {
    name: name.findName(),
    email: internet.email(),
    password: 'password',
    active: true,
    agreedToNewsletter: datatype.boolean(),
  });

export const userCustomerInputSelfMock = () =>
  plainToClass(CustomerInputSelfDto, {
    name: name.findName(),
    email: internet.email(),
    password: 'password',
    agreedToNewsletter: datatype.boolean(),
  });
