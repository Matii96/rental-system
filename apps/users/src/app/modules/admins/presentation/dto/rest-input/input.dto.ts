import { IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AdminInputDto } from '@rental-system/dto';
import { UserRestInputDto } from '../../../../users/presentation/dto/rest-input/input.dto';

export class AdminRestInputDto extends UserRestInputDto implements AdminInputDto {
  @ApiProperty()
  @IsBoolean()
  agreedToNewsletter: boolean;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  salary: number;
}
