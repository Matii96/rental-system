import { IUser, UserTypes } from '@rental-system/domain';
import { IUserJwt } from '../interfaces/user-jwt.interface';

export class UserJwtDto implements IUserJwt {
  id: string;
  name: string;
  email: string;
  type: UserTypes;

  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.type = user.getType();
  }
}
