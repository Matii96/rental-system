import { UserTypes } from '../../enums/user-types.enum';
import { IUser } from '../../interfaces/user.interface';
import { CanReceiveNewsletterAbility } from './abilities/can-receive-newsletter.ability';
import { CanGetPaidAbility } from './abilities/can-get-paid.ability';
import { UserEntity } from './user.entity';

export class UserAdminEntity extends CanReceiveNewsletterAbility(CanGetPaidAbility(UserEntity)) implements IUser {
  constructor(
    id: string,
    createdAt: Date,
    name: string,
    email: string,
    password: string,
    salary: number,
    agreedToNewsletter: boolean
  ) {
    super(id, createdAt, name, email, password);
    this.salary = salary;
    this.agreedToNewsletter = agreedToNewsletter;
  }

  getType() {
    return UserTypes.USER_ADMIN;
  }

  toString(): string {
    return `Administrator id=${this.id}`;
  }
}
