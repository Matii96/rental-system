import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserInputSelfDto } from '@rental-system/dto';

export abstract class UserRestInputSelfDto extends UserInputSelfDto {
  @ApiProperty({ example: 'John Smith' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'john@foo.com' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
