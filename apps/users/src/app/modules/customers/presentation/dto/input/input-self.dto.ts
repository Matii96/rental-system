import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICustomerInputSelf } from '@rental-system/interfaces';
import { UserInputSelfDto } from '../../../../users/presentation/dto/input/input-self.dto';

export class CustomerInputSelfDto extends UserInputSelfDto implements ICustomerInputSelf {
  @ApiProperty()
  @IsBoolean()
  agreedToNewsletter: boolean;
}
