import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICustomerInput } from '@rental-system/dto-interfaces';
import { UserInputDto } from '../../../dto/input/input.dto';

export class CustomerInputDto extends UserInputDto implements ICustomerInput {
  @ApiProperty()
  @IsBoolean()
  agreedToNewsletter: boolean;
}
