import { IUser } from '@rental-system/domain';
import { UserOutputDto } from './output.dto';

export abstract class UserLoginOutputDto extends UserOutputDto {
  readonly jwt: string;

  constructor(user: IUser, jwt: string) {
    super(user);
    this.jwt = jwt;
  }
}
