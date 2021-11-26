import { AggregateId } from '@rental-system/common';
import { UserTypes } from '../../enums/user-types.enum';
import { IUser } from '../../interfaces/user.interface';
import { CanReceiveNewsletterAbility } from './abilities/can-receive-newsletter.ability';
import { CanGetPaidAbility } from './abilities/can-get-paid.ability';
import { UserEntity } from './user.entity';

export class UserAdminEntity extends CanReceiveNewsletterAbility(CanGetPaidAbility(UserEntity)) implements IUser {
  readonly type = UserTypes.ADMIN;

  constructor(
    id: AggregateId,
    createdAt: Date,
    name: string,
    email: string,
    password: string,
    active: boolean,
    salary: number,
    agreedToNewsletter: boolean
  ) {
    super(id, createdAt, name, email, password, active);
    this.salary = salary;
    this.agreedToNewsletter = agreedToNewsletter;
  }

  getType() {
    return UserTypes.ADMIN;
  }

  toString(): string {
    return `Administrator id=${this.id}`;
  }
}
