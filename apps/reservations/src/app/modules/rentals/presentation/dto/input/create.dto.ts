import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsUUID } from 'class-validator';
import { ICreateRentalInput } from '@rental-system/interfaces';

export class RentalCreateInputDto implements Omit<ICreateRentalInput, 'cardId'> {
  @ApiProperty()
  @IsUUID()
  itemId: string;

  @ApiProperty()
  @IsDateString()
  expectedReturnDate: Date;
}
