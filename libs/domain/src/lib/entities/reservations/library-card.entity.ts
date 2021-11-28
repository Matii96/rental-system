import { AggregateId } from '@rental-system/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { RentalAlreadyClosedException } from '../../exceptions/reservations/rental-already-closed.exception';
import { RentalEntity } from './rental.entity';

export class LibraryCardEntity extends AggregateRoot {
  constructor(readonly id: AggregateId, readonly ownerId: AggregateId, readonly activeRentals: AggregateId[]) {
    super();
  }

  registerRental(rental: RentalEntity) {
    if (rental.getReturnDate()) {
      throw new RentalAlreadyClosedException(rental);
    }
    this.activeRentals.push(rental.id);
  }

  toString(): string {
    return `Library card id=${this.id}`;
  }
}
