import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsUUID } from 'class-validator';
import { RentalCreateInputDto } from '@rental-system/dto';

export class RentalCreateRestInputDto extends RentalCreateInputDto {
  @ApiProperty()
  @IsUUID()
  readonly itemId: string;

  @ApiProperty()
  @IsDateString()
  readonly expectedReturnDate: Date;
}
