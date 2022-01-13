import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomerInputDto } from '@rental-system/dto';
import { UserRestInputDto } from '../../../../users/presentation/dto/rest-input/input.dto';

export class CustomerRestInputDto extends UserRestInputDto implements CustomerInputDto {
  @ApiProperty()
  @IsBoolean()
  readonly agreedToNewsletter: boolean;
}
