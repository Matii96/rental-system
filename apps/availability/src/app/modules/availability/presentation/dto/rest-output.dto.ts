import { ApiProperty } from '@nestjs/swagger';
import { AvailabilityOutputDto } from '@rental-system/dto';

export class AvailabilityRestOutputDto extends AvailabilityOutputDto {
  @ApiProperty()
  readonly total: number;

  @ApiProperty()
  readonly reserved: number;
}
