import { UserAdminEntity, UserCustomerEntity } from '@rental-system/domain';
import { userAdminEntityMock, userCustomerEntityMock } from '@rental-system/domain-testing';
import { UserCustomerModel } from './models/user-customer.model';
import { UserAdminModel } from './models/user-admin.model';
import { UserModel } from './models/user.model';

export const userModelMock = (user: UserAdminEntity | UserCustomerEntity) =>
  <UserModel>{
    id: user.id,
    createdAt: user.createdAt,
    name: user.name,
    email: user.email,
    password: user.getPassword(),
  };

export const userAdminModelMock = (user = userAdminEntityMock()) =>
  <UserAdminModel>{
    agreedToNewsletter: user.agreedToNewsletter,
    salary: user.salary,
    userId: user.id,
    user: null,
  };

export const userCustomerModelMock = (user = userCustomerEntityMock()) =>
  <UserCustomerModel>{
    agreedToNewsletter: user.agreedToNewsletter,
    userId: user.id,
    user: null,
  };
