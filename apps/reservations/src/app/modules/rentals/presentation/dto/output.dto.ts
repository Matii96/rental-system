import { ApiProperty } from '@nestjs/swagger';
import { RentalEntity } from '@rental-system/domain';
import { IRentalOutput } from '@rental-system/interfaces';

export class RentalOutputDto implements IRentalOutput {
  @ApiProperty()
  id: string;

  @ApiProperty()
  itemId: string;

  @ApiProperty()
  registrationDate: Date;

  @ApiProperty()
  returnDate: Date;

  @ApiProperty()
  expectedReturnDate: Date;

  @ApiProperty()
  prolongCounter: number;

  @ApiProperty()
  maxProlongations: number;

  @ApiProperty()
  isClosed: boolean;

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
