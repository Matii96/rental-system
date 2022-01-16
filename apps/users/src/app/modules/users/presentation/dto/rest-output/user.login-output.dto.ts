import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '@rental-system/domain';
import { UserLoginOutputDto } from '@rental-system/dto';
import { UserRestOutputDto } from './user.output.dto';

export class UserLoginRestOutputDto extends UserRestOutputDto implements UserLoginOutputDto {
  @ApiProperty()
  readonly jwt: string;

  constructor(user: IUser, jwt: string) {
    super(user);
    this.jwt = jwt;
  }
}
