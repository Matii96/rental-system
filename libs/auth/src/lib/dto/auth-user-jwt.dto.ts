import { IUser, UserTypes } from '@rental-system/domain';

export class AuthUserJwtDto {
  readonly type: UserTypes;
  readonly userId: string;
  readonly iat: number;
  readonly exp: number;

  constructor(user: IUser) {
    this.type = user.type;
    this.userId = user.id;
  }
}
