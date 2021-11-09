import { CanReceiveNewsletterAbility } from './abilities/can-receive-newsletter.ability';
import { UserEntity } from './user.entity';

export class UserCustomerEntity extends CanReceiveNewsletterAbility(UserEntity) {
  constructor(id: string, createdAt: Date, name: string, email: string, password: string, agreedToNewsletter: boolean) {
    super(id, createdAt, name, email, password);
    this.agreedToNewsletter = agreedToNewsletter;
  }

  toString(): string {
    return `Customer id=${this.id}`;
  }
}
