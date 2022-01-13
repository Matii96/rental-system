import { datatype, name, internet } from 'faker';
import { plainToClass } from 'class-transformer';
import { AdminInputDto, AdminInputSelfDto } from '@rental-system/dto';

export const userAdminInputMock = () =>
  plainToClass(AdminInputDto, {
    name: name.findName(),
    email: internet.email(),
    password: 'password',
    active: true,
    salary: datatype.number({ min: 1000, max: 10000 }),
    agreedToNewsletter: datatype.boolean(),
  });

export const userAdminInputSelfMock = () =>
  plainToClass(AdminInputSelfDto, {
    name: name.findName(),
    email: internet.email(),
    password: 'password',
    agreedToNewsletter: datatype.boolean(),
  });
