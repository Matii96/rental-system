import { RentalEntity } from '../../entities/reservations/rental.entity';

export class OverdueRentalException extends Error {
  constructor(rental: RentalEntity) {
    super(`Overdue ${rental} can't be prolonged`);
  }
}
