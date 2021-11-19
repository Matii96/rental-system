import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUserInput } from '@rental-system/dto-interfaces';
import { UserInputSelfDto } from './input-self.dto';

export abstract class UserInputDto extends UserInputSelfDto implements IUserInput {
  @ApiProperty({ example: true })
  @IsBoolean()
  active: boolean;
}
