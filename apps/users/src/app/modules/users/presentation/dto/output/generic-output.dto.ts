import { ApiProperty } from '@nestjs/swagger';
import { IUser, UserTypes } from '@rental-system/domain';
import { IUserGenericOutput } from '@rental-system/dto-interfaces';
import { UserOutputDto } from './output.dto';

export class UserGenericOutputDto extends UserOutputDto implements IUserGenericOutput {
  @ApiProperty({ enum: UserTypes, example: Object.keys(UserTypes)[0] })
  type: UserTypes;

  constructor(user: IUser) {
    super(user);
    this.type = user.type;
  }
}
