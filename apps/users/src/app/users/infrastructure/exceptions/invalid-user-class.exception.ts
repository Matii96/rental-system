import { NotImplementedException } from '@nestjs/common';

export class InvalidUserClassException extends NotImplementedException {
  constructor(userId: string) {
    super('Invalid user class for User id=' + userId);
  }
}
