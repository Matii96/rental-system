import { AggregateRoot } from '@nestjs/cqrs';
import { hashSync, compareSync } from 'bcrypt';
import { IIdentifiableEntity } from '@rental-system/common';
import { InvalidLoginException } from '../../exceptions/invalid-login.exception';

export class UserEntity extends AggregateRoot implements IIdentifiableEntity<string> {
  constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public name: string,
    public email: string,
    private password: string
  ) {
    super();
  }

  setPassword(password: string, salt: number) {
    this.password = hashSync(password, salt);
  }

  checkPassword(password: string) {
    if (!compareSync(password, this.password)) {
      throw new InvalidLoginException();
    }
  }

  toString(): string {
    return `User id=${this.id}`;
  }
}
