import { Injectable } from '@nestjs/common';
import { UserAdminEntity } from '@rental-system/domain';
import { IEntityModelFactory } from '@rental-system/common';
import { UserAdminModel } from '../../models/user-admin.model';
import { UserModel } from '../../models/user.model';

@Injectable()
export class UsersAdminsModelFactory implements IEntityModelFactory<UserAdminEntity, UserAdminModel> {
  entityToUserModel(user: UserAdminEntity): UserModel {
    return <UserModel>{
      id: user.id,
      createdAt: user.createdAt,
      name: user.name,
      email: user.email,
      password: user.getPassword(),
    };
  }

  entityToModel(user: UserAdminEntity): UserAdminModel {
    return <UserAdminModel>{
      agreedToNewsletter: user.agreedToNewsletter,
      salary: user.salary,
      userId: user.id,
      user: null,
    };
  }

  modelToEntity(adminModel: UserAdminModel, baseModel: UserModel): UserAdminEntity {
    return new UserAdminEntity(
      baseModel.id,
      baseModel.createdAt,
      baseModel.name,
      baseModel.email,
      baseModel.password,
      adminModel.salary,
      adminModel.agreedToNewsletter
    );
  }
}
