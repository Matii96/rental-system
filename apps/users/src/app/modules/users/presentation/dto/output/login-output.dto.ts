import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '@rental-system/domain';
import { IUserLoginOutput } from '@rental-system/interfaces';
import { UserOutputDto } from './output.dto';

export class UserLoginOutputDto extends UserOutputDto implements IUserLoginOutput {
  @ApiProperty()
  jwt: string;

  constructor(user: IUser, jwt: string) {
    super(user);
    this.jwt = jwt;
  }
}
