import { ApiProperty } from '@nestjs/swagger';
import { RentalOutputDto } from '@rental-system/dto';

export class RentalRestOutputDto extends RentalOutputDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly itemId: string;

  @ApiProperty()
  readonly registrationDate: Date;

  @ApiProperty()
  readonly returnDate: Date;

  @ApiProperty()
  readonly expectedReturnDate: Date;

  @ApiProperty()
  readonly prolongCounter: number;

  @ApiProperty()
  readonly maxProlongations: number;

  @ApiProperty()
  readonly isClosed: boolean;
}
