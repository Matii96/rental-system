import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUserLoginInput } from '@rental-system/interfaces';

export class UserLoginInputDto implements IUserLoginInput {
  @ApiProperty({ example: 'admin' })
  @IsString()
  @IsNotEmpty()
  nameOrEmail: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
