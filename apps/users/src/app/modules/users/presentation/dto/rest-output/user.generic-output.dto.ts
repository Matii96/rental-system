import { ApiProperty } from '@nestjs/swagger';
import { IUser, UserTypes } from '@rental-system/domain';
import { UserGenericOutputDto } from '@rental-system/dto';
import { UserRestOutputDto } from './user.output.dto';

export class UserGenericRestOutputDto extends UserRestOutputDto implements UserGenericOutputDto {
  @ApiProperty({ enum: UserTypes, example: Object.keys(UserTypes)[0] })
  readonly type: UserTypes;

  constructor(user: IUser) {
    super(user);
    this.type = user.type;
  }
}
