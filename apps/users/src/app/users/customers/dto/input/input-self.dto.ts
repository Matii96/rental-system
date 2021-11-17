import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICustomerInputSelf } from '@rental-system/dto-interfaces';
import { UserInputSelfDto } from '../../../dto/input/input-self.dto';

export class CustomerInputSelfDto extends UserInputSelfDto implements ICustomerInputSelf {
  @ApiProperty()
  @IsBoolean()
  agreedToNewsletter: boolean;
}
