import { userCustomerEntityMock } from '@rental-system/domain-testing';
import { UserCustomerModel } from './infrastructure/database/models/user-customer.model';

export const userCustomerModelMock = (user = userCustomerEntityMock()) =>
  <UserCustomerModel>{
    id: user.id,
    base: null,
    agreedToNewsletter: user.agreedToNewsletter,
  };
