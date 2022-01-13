import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserInputDto } from '@rental-system/dto';

export abstract class UserRestInputDto extends UserInputDto {
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

  @ApiProperty({ example: true })
  @IsBoolean()
  readonly active: boolean;
}
