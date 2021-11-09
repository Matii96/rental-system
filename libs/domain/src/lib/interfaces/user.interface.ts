import { UserEntity } from '../entities/users/user.entity';
import { UserTypes } from '../enums/user-types.enum';

export interface IUser extends UserEntity {
  getType(): UserTypes;
}
