import { AggregateId } from '@rental-system/common';
import { IUser } from '@rental-system/domain';

export interface IUserController<TUser extends IUser> {
  getEntityById(id: AggregateId): TUser | Promise<TUser>;
}
