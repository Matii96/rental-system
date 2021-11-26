import { BadRequestException } from '@nestjs/common';
import { AggregateId } from '@rental-system/common';

export class NotEnoughItemsTotalException extends BadRequestException {
  constructor(id: AggregateId, reserved: number) {
    super(`Total availability of item id=${id} can't be lower than currently reserved (${reserved})`);
  }
}
