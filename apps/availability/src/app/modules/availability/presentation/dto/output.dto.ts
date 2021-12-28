import { ApiProperty } from '@nestjs/swagger';
import { AvailabilityEntity } from '@rental-system/domain';
import { IAvailabilityOutput } from '@rental-system/interfaces';

export class AvailabilityOutputDto implements IAvailabilityOutput {
  @ApiProperty()
  total: number;

  @ApiProperty()
  reserved: number;

  constructor(availability: AvailabilityEntity) {
    this.total = availability.getTotal();
    this.reserved = availability.getReserved();
  }
}
