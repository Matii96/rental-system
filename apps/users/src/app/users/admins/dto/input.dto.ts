import { IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserInputDto } from '../../dto/input/input.dto';

export class AdminInputDto extends UserInputDto {
  @ApiProperty()
  @IsBoolean()
  agreedToNewsletter: boolean;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  salary: number;
}
