import { IUser } from '@rental-system/domain';

export class AuthUserJwtDto {
  readonly userId: string;
  readonly iat: number;
  readonly exp: number;

  constructor(user: IUser) {
    this.userId = user.id.toString();
  }
}
