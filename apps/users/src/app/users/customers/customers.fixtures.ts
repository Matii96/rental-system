import { userCustomerEntityMock } from '@rental-system/domain-testing';
import { UserCustomerModel } from './models/user-customer.model';

export const userCustomerModelMock = (user = userCustomerEntityMock()) =>
  <UserCustomerModel>{
    id: user.id,
    user: null,
    agreedToNewsletter: user.agreedToNewsletter,
  };
