import { DomainException } from '@rental-system/common';

export class InvalidLoginException extends DomainException {
  constructor() {
    super('Invalid login');
  }
}
