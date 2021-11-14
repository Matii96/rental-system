import { UserAdminEntity, UserCustomerEntity } from '@rental-system/domain';
import { UserTypes } from '../enums/user-types.enum';

export const UsersMapper = {
  [UserTypes.USER_ADMIN]: UserAdminEntity,
  [UserTypes.USER_CUSTOMER]: UserCustomerEntity,
};
