import { RentalEntity } from '../../entities/reservations/rental.entity';

export class MaxProlongationsExceededException extends Error {
  constructor(rental: RentalEntity) {
    super(`Max prolongations for ${rental} exceeded`);
  }
}
