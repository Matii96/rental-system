import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { ProlongRentalInputDto } from '@rental-system/dto';

export class RentalProlongInputDto extends ProlongRentalInputDto {
  @ApiProperty()
  @IsDateString()
  readonly to: Date;
}
