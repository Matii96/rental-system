import { IUser } from '@rental-system/domain';
import { UserModel } from './infrastructure/database/models/user.model';

export const userModelMock = (user: IUser) =>
  <UserModel>{
    id: user.id.toString(),
    createdAt: user.createdAt,
    name: user.name,
    email: user.email,
    password: user.getPassword(),
    active: user.isActive(),
  };
