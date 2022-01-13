import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserLoginInputDto } from '@rental-system/dto';

export class UserLoginRestInputDto extends UserLoginInputDto {
  @ApiProperty({ example: 'admin' })
  @IsString()
  @IsNotEmpty()
  readonly nameOrEmail: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
