import { BadRequestException } from '@nestjs/common';

export class NoItemToReturnException extends BadRequestException {
  constructor() {
    super('No item to return');
  }
}
