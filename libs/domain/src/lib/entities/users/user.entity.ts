import { AggregateRoot } from '@nestjs/cqrs';
import { hashSync, compareSync } from 'bcryptjs';
import { IIdentifiableEntity } from '@rental-system/common';
import { InvalidLoginException } from '../../exceptions/invalid-login.exception';

export class UserEntity extends AggregateRoot implements IIdentifiableEntity<string> {
  constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public name: string,
    public email: string,
    private password: string,
    private active: boolean
  ) {
    super();
  }

  getPassword() {
    return this.password;
  }

  setPassword(password: string, salt: number) {
    this.password = hashSync(password, salt);
  }

  /**
   * Throws InvalidLoginException if password is invalid
   */
  checkPassword(password: string) {
    if (!compareSync(password, this.password)) {
      throw new InvalidLoginException();
    }
  }

  isActive() {
    return this.active;
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }

  toString(): string {
    return `User id=${this.id}`;
  }
}
