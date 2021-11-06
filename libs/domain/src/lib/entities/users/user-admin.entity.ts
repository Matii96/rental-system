import { canGetPaidAbility } from './abilities/can-get-paid.ability';
import { UserEntity } from './user.entity';

export class UserAdminEntity extends canGetPaidAbility(UserEntity) {
  constructor(id: string, createdAt: Date, name: string, email: string, password: string, salary: number) {
    super(id, createdAt, name, email, password);
    this.salary = salary;
  }

  toString(): string {
    return `Administrator id=${this.id}`;
  }
}
