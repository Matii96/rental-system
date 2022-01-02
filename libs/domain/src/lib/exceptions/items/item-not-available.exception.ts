import { DomainException } from '@rental-system/common';
import { AvailabilityEntity } from '../../entities/items/availability.entity';

export class ItemNotAvailableException extends DomainException {
  constructor(availability: AvailabilityEntity) {
    super(`Item id=${availability.id} is not available to reserve`);
  }
}
