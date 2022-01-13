import { RentalEntity } from '@rental-system/domain';

export class RentalOutputDto {
  readonly id: string;
  readonly itemId: string;
  readonly registrationDate: Date;
  readonly returnDate: Date;
  readonly expectedReturnDate: Date;
  readonly prolongCounter: number;
  readonly maxProlongations: number;
  readonly isClosed: boolean;

  constructor(rental: RentalEntity) {
    this.id = rental.id.toString();
    this.itemId = rental.itemId.toString();
    this.registrationDate = rental.registrationDate;
    this.returnDate = rental.getReturnDate();
    this.expectedReturnDate = rental.getExpectedReturnDate();
    this.prolongCounter = rental.getProlongCounter();
    this.maxProlongations = rental.maxProlongations;
    this.isClosed = rental.isClosed;
  }
}
