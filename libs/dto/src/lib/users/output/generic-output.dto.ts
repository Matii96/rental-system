import { IUser, UserTypes } from '@rental-system/domain';
import { UserOutputDto } from './output.dto';

export abstract class UserGenericOutputDto extends UserOutputDto {
  readonly type: UserTypes;

  constructor(user: IUser) {
    super(user);
    this.type = user.type;
  }
}
