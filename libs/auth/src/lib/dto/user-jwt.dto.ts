import { IUser, UserTypes } from '@rental-system/domain';

export class UserJwtDto {
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
