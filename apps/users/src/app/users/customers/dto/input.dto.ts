import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserInputDto } from '../../dto/input/input.dto';

export class CustomerInputDto extends UserInputDto {
  @ApiProperty()
  @IsBoolean()
  agreedToNewsletter: boolean;
}
