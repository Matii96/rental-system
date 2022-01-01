import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { IProlongRentalInput } from '@rental-system/interfaces';

export class RentalProlongInputDto implements IProlongRentalInput {
  @ApiProperty()
  @IsDateString()
  to: Date;
}
