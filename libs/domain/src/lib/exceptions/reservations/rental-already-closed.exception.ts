import { DomainException } from '@rental-system/common';
import { RentalEntity } from '../../entities/reservations/rental.entity';

export class RentalAlreadyClosedException extends DomainException {
  constructor(rental: RentalEntity) {
    super(`${rental} is already closed`);
  }
}
