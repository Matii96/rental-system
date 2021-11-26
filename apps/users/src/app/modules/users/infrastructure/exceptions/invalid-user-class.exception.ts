import { NotImplementedException } from '@nestjs/common';
import { AggregateId } from '@rental-system/common';

export class InvalidUserClassException extends NotImplementedException {
  constructor(userId: AggregateId) {
    super('Invalid user class for User id=' + userId);
  }
}
