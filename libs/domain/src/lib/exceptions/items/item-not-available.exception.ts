import { BadRequestException } from '@nestjs/common';
import { AvailabilityEntity } from '../../entities/items/availability.entity';

export class ItemNotAvailableException extends BadRequestException {
  constructor(availability: AvailabilityEntity) {
    super(`Item id=${availability.id} is not available to reserve`);
  }
}
