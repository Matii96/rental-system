import { UserTypes } from '../../enums/user-types.enum';
import { IUser } from '../../interfaces/user.interface';
import { CanReceiveNewsletterAbility } from './abilities/can-receive-newsletter.ability';
import { UserEntity } from './user.entity';

export class UserCustomerEntity extends CanReceiveNewsletterAbility(UserEntity) implements IUser {
  readonly type = UserTypes.CUSTOMER;

  constructor(
    id: string,
    createdAt: Date,
    name: string,
    email: string,
    password: string,
    active: boolean,
    agreedToNewsletter: boolean
  ) {
    super(id, createdAt, name, email, password, active);
    this.agreedToNewsletter = agreedToNewsletter;
  }

  toString(): string {
    return `Customer id=${this.id}`;
  }
}
