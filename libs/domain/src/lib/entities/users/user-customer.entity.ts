import { UserTypes } from '../../enums/user-types.enum';
import { IUser } from '../../interfaces/user.interface';
import { CanReceiveNewsletterAbility } from './abilities/can-receive-newsletter.ability';
import { UserEntity } from './user.entity';

export class UserCustomerEntity extends CanReceiveNewsletterAbility(UserEntity) implements IUser {
  constructor(id: string, createdAt: Date, name: string, email: string, password: string, agreedToNewsletter: boolean) {
    super(id, createdAt, name, email, password);
    this.agreedToNewsletter = agreedToNewsletter;
  }

  getType() {
    return UserTypes.USER_CUSTOMER;
  }

  toString(): string {
    return `Customer id=${this.id}`;
  }
}
