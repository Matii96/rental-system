import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { IAvailabilityTotalInput } from '@rental-system/dto-interfaces';

export class AvailabilityTotalInputDto implements IAvailabilityTotalInput {
  @ApiProperty()
  @IsInt()
  @Min(0)
  total: number;
}
