import { ApiProperty } from '@nestjs/swagger';
import { IUser, UserTypes } from '@rental-system/domain';

export class UserOutputDto {
  @ApiProperty({ enum: UserTypes, example: Object.keys(UserTypes)[0] })
  type: UserTypes;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  constructor(user: IUser) {
    this.type = user.getType();
    this.name = user.name;
    this.email = user.email;
  }
}
