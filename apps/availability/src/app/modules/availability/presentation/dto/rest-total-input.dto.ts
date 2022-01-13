import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { AvailabilityTotalInputDto } from '@rental-system/dto';

export class AvailabilityTotalRestInputDto extends AvailabilityTotalInputDto {
  @ApiProperty()
  @IsInt()
  @Min(0)
  readonly total: number;
}
