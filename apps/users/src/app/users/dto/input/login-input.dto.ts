import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginInputDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nameOrEmail: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
