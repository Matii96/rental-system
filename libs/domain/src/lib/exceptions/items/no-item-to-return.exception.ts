import { DomainException } from '@rental-system/common';

export class NoItemToReturnException extends DomainException {
  constructor() {
    super('No item to return');
  }
}
