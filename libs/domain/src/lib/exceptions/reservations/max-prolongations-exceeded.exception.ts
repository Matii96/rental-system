import { DomainException } from '@rental-system/common';
import { RentalEntity } from '../../entities/reservations/rental.entity';

export class MaxProlongationsExceededException extends DomainException {
  constructor(rental: RentalEntity) {
    super(`Max prolongations for ${rental} exceeded`);
  }
}
