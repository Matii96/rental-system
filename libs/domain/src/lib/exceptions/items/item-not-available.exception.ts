import { BadRequestException } from '@nestjs/common';

export class ItemNotAvailableException extends BadRequestException {
  constructor(id: string) {
    super(`Item id=${id} is not available to reserve`);
  }
}
