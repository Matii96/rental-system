import { BadRequestException } from '@nestjs/common';

export class InvalidIdException extends BadRequestException {
  constructor() {
    super('Invalid uuid id');
  }
}
