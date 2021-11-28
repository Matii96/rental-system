import { AggregateId } from '@rental-system/common';
import { MaxProlongationsExceededException } from '../../exceptions/reservations/max-prolongations-exceeded.exception';
import { OverdueRentalException } from '../../exceptions/reservations/overdue-rental.exception';

export class RentalEntity {
  private maxProlongations = 2;

  constructor(
    readonly id: AggregateId,
    readonly itemId: AggregateId,
    readonly registrationDate: Date,
    private returnDate: Date,
    private expectedReturnDate: Date,
    private prolongCounter: number
  ) {}

  getReturnDate() {
    return this.returnDate;
  }

  getExpectedReturnDate() {
    return this.expectedReturnDate;
  }

  getProlongCounter() {
    return this.prolongCounter;
  }

  get isClosed(): boolean {
    return Boolean(this.returnDate);
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
