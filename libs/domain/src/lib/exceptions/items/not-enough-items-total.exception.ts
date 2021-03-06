import { DomainException } from '@rental-system/common';
import { AvailabilityEntity } from '../../entities/items/availability.entity';

export class NotEnoughItemsTotalException extends DomainException {
  constructor(availability: AvailabilityEntity) {
    super(
      `Total availability of Item id=${
        availability.id
      } can't be lower than currently reserved (${availability.getReserved()})`
    );
  }
}
