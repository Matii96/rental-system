import { AggregateId } from '@rental-system/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { IRentalPolicy } from '../../interfaces/rental-policy.interface';
import { RentalAlreadyClosedException } from '../../exceptions/reservations/rental-already-closed.exception';
import { RentalPolicyFailedException } from '../../exceptions/reservations/rental-policies/policy-failed.exception';
import { RentalNotActiveException } from '../../exceptions/reservations/rental-not-active.exception';
import { RentalEntity } from './rental.entity';

export class LibraryCardEntity extends AggregateRoot {
  constructor(
    readonly id: AggregateId,
    readonly ownerId: AggregateId,
    readonly activeRentals: AggregateId[],
    readonly rentalPolicy: IRentalPolicy
  ) {
    super();
  }

  registerRental(rental: RentalEntity) {
    if (rental.isClosed) {
      throw new RentalAlreadyClosedException(rental);
    }
    if (!this.rentalPolicy.canRent(this, rental)) {
      throw new RentalPolicyFailedException(this);
    }
    this.activeRentals.push(rental.id);
  }

  returnRental(rental: RentalEntity) {
    const rentalIdx = this.activeRentals.findIndex((rentalId) => rentalId === rental.id);
    if (rentalIdx === -1) {
      throw new RentalNotActiveException(this, rental);
    }
    rental.close();
    this.activeRentals.splice(rentalIdx, 1);
  }

  toString(): string {
    return `Library card id=${this.id}`;
  }
}
