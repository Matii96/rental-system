import { RentalEntity } from '../../entities/reservations/rental.entity';

export class RentalAlreadyClosedException extends Error {
  constructor(rental: RentalEntity) {
    super(`${rental} is already closed`);
  }
}
