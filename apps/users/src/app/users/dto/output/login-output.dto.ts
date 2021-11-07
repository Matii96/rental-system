import { ApiProperty } from '@nestjs/swagger';

export class UserLoginOutputDto {
  @ApiProperty()
  nameOrEmail: string;

  @ApiProperty()
  password: string;
}
