import { AggregateRoot } from '@nestjs/cqrs';
import { AggregateId } from '@rental-system/common';
import { MaxProlongationsExceededException } from '../../exceptions/reservations/max-prolongations-exceeded.exception';
import { OverdueRentalException } from '../../exceptions/reservations/overdue-rental.exception';

export class RentalEntity extends AggregateRoot {
  private maxProlongations = 2;

  constructor(
    readonly id: AggregateId,
    readonly itemId: AggregateId,
    readonly registrationDate: Date,
    private returnDate: Date,
    private expectedReturnDate: Date,
    private prolongCounter: number
  ) {
    super();
  }

  getReturnDate() {
    return this.returnDate;
  }

  getExpectedReturnDate() {
    return this.expectedReturnDate;
  }

  getProlongCounter() {
    return this.prolongCounter;
  }

  prolong(to: Date) {
    const now = new Date();
    if (now > this.expectedReturnDate) {
      throw new OverdueRentalException(this);
    }

    if (this.prolongCounter === this.maxProlongations) {
      throw new MaxProlongationsExceededException(this);
    }

    this.expectedReturnDate = to;
    this.prolongCounter++;
  }

  close() {
    this.returnDate = new Date();
  }

  toString(): string {
    return `Rental id=${this.id}`;
  }
}
