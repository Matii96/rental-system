import { NotImplementedException } from '@nestjs/common';

export class InvalidContextTypeException extends NotImplementedException {
  constructor(type: string) {
    super('Invalid request context type' + type);
  }
}
