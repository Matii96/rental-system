import { IUser } from '@rental-system/domain';

export interface IUserController<TUser extends IUser> {
  getUserById(id: string): TUser | Promise<TUser>;
}
