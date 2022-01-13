import { ApiProperty } from '@nestjs/swagger';
import { IUser, UserTypes } from '@rental-system/domain';
import { UserRestOutputDto } from './output.dto';

export class UserGenericRestOutputDto extends UserRestOutputDto {
  @ApiProperty({ enum: UserTypes, example: Object.keys(UserTypes)[0] })
  readonly type: UserTypes;

  constructor(user: IUser) {
    super(user);
    this.type = user.type;
  }
}
