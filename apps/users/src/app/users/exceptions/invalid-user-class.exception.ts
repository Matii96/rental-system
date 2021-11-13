import { InternalServerErrorException } from '@nestjs/common';

export class InvalidUserClassException extends InternalServerErrorException {
  constructor(userId: string) {
    super('Invalid user class for User id=' + userId);
  }
}
