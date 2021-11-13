import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export abstract class UserInputDto {
  @ApiProperty({ example: 'John Smith' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@foo.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
