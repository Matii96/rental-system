import { IUser, UserTypes } from '@rental-system/domain';

export class AuthUserDto {
  type: UserTypes;
  data: IUser;
  iat: number;
  exp: number;

  constructor(user: IUser) {
    this.type = user.getType();
    this.data = JSON.parse(JSON.stringify(user));
  }
}
