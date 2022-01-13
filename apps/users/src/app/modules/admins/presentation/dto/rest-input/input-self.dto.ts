import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AdminInputSelfDto } from '@rental-system/dto';
import { UserRestInputSelfDto } from '../../../../users/presentation/dto/rest-input/input-self.dto';

export class AdminRestInputSelfDto extends UserRestInputSelfDto implements AdminInputSelfDto {
  @ApiProperty()
  @IsBoolean()
  readonly agreedToNewsletter: boolean;
}
