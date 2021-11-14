import { UserCustomerEntity } from '../entities/users/user-customer.entity';
import { UserAdminEntity } from '../entities/users/user-admin.entity';
import { UserTypes } from '../enums/user-types.enum';

export const UsersMapper = {
  [UserTypes.USER_ADMIN]: UserAdminEntity,
  [UserTypes.USER_CUSTOMER]: UserCustomerEntity,
};
