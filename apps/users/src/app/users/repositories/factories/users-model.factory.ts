import { Injectable } from '@nestjs/common';
import { IUser } from '@rental-system/domain';
import { IEntityModelFactory } from '@rental-system/common';
import { UserModel } from '../../models/user.model';

@Injectable()
export class UsersModelFactory implements IEntityModelFactory<IUser, UserModel> {
  entityToModel(user: IUser): UserModel {
    return <UserModel>{
      id: user.id,
      createdAt: user.createdAt,
      name: user.name,
      email: user.email,
      password: user.getPassword(),
    };
  }

  modelToEntity(): IUser {
    return null;
  }
}
