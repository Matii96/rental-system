import { DomainException } from '@rental-system/common';
import { RentalEntity } from '../../entities/reservations/rental.entity';

export class OverdueRentalException extends DomainException {
  constructor(rental: RentalEntity) {
    super(`Overdue ${rental} can't be prolonged`);
  }
}
