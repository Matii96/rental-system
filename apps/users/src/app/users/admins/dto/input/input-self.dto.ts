import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IAdminInputSelf } from '@rental-system/dto-interfaces';
import { UserInputSelfDto } from '../../../dto/input/input-self.dto';

export class AdminInputSelfDto extends UserInputSelfDto implements IAdminInputSelf {
  @ApiProperty()
  @IsBoolean()
  agreedToNewsletter: boolean;
}
