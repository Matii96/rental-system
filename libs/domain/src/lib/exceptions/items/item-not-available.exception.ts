import { BadRequestException } from '@nestjs/common';
import { AggregateId } from '@rental-system/common';

export class ItemNotAvailableException extends BadRequestException {
  constructor(id: AggregateId) {
    super(`Item id=${id} is not available to reserve`);
  }
}
