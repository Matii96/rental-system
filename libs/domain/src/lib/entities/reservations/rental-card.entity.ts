import { AggregateId } from '@rental-system/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { IRentalPolicy } from '../../interfaces/reservations/rental-policy.interface';
import { RentalAlreadyClosedException } from '../../exceptions/reservations/rental-already-closed.exception';
import { RentalPolicyFailedException } from '../../exceptions/reservations/rental-policies/policy-failed.exception';
import { RentalEntity } from './rental.entity';

export class RentalCardEntity extends AggregateRoot {
  constructor(
    readonly id: AggregateId,
    readonly ownerId: AggregateId,
    readonly activeRentals: AggregateId[],
    public rentalPolicy: IRentalPolicy
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

  toString(): string {
    return `Rental card id=${this.id}`;
  }
}
