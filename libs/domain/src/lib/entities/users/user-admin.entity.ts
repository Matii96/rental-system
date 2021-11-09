import { CanReceiveNewsletterAbility } from './abilities/can-receive-newsletter.ability';
import { CanGetPaidAbility } from './abilities/can-get-paid.ability';
import { UserEntity } from './user.entity';

export class UserAdminEntity extends CanReceiveNewsletterAbility(CanGetPaidAbility(UserEntity)) {
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

  toString(): string {
    return `Administrator id=${this.id}`;
  }
}
