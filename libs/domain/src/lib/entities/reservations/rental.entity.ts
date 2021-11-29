import { AggregateRoot } from '@nestjs/cqrs';
import { AggregateId } from '@rental-system/common';
import { MaxProlongationsExceededException } from '../../exceptions/reservations/max-prolongations-exceeded.exception';
import { RentalAlreadyClosedException } from '../../exceptions/reservations/rental-already-closed.exception';
import { OverdueRentalException } from '../../exceptions/reservations/overdue-rental.exception';

export class RentalEntity extends AggregateRoot {
  constructor(
    readonly id: AggregateId,
    readonly cardId: AggregateId,
    readonly itemId: AggregateId,
    readonly registrationDate: Date,
    private returnDate: Date,
    private expectedReturnDate: Date,
    private prolongCounter: number,
    private readonly maxProlongations: number
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

  get isClosed() {
    return Boolean(this.returnDate);
  }

  prolong(to: Date) {
    if (this.isClosed) {
      throw new RentalAlreadyClosedException(this);
    }

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
    if (this.isClosed) {
      throw new RentalAlreadyClosedException(this);
    }
    this.returnDate = new Date();
  }

  toString(): string {
    return `Rental id=${this.id}`;
  }
}
