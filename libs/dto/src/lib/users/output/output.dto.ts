import { IUser } from '@rental-system/domain';

export abstract class UserOutputDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly active: boolean;

  constructor(user: IUser) {
    this.id = user.id.toString();
    this.name = user.name;
    this.email = user.email;
    this.active = user.isActive();
  }
}
