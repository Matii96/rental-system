import { userAdminEntityMock } from '@rental-system/domain-testing';
import { UserAdminModel } from './infrastructure/database/models/admin.model';

export const userAdminModelMock = (user = userAdminEntityMock()) =>
  <UserAdminModel>{
    id: user.id,
    base: null,
    agreedToNewsletter: user.agreedToNewsletter,
    salary: user.salary,
  };
