import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomerInputSelfDto } from '@rental-system/dto';
import { UserRestInputSelfDto } from '../../../../users/presentation/dto/rest-input/input-self.dto';

export class CustomerRestInputSelfDto extends UserRestInputSelfDto implements CustomerInputSelfDto {
  @ApiProperty()
  @IsBoolean()
  readonly agreedToNewsletter: boolean;
}
