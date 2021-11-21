import { Injectable } from '@nestjs/common';
import { UserAdminEntity } from '@rental-system/domain';
import { IEntityModelFactory } from '@rental-system/common';
import { UserModel } from '../../../../users/infrastructure/database/models/user.model';
import { UserAdminModel } from '../models/admin.model';

@Injectable()
export class AdminsModelFactory implements IEntityModelFactory<UserAdminEntity, UserAdminModel> {
  entityToModel(user: UserAdminEntity): UserAdminModel {
    return <UserAdminModel>{
      id: user.id,
      base: null,
      agreedToNewsletter: user.agreedToNewsletter,
      salary: user.salary,
    };
  }

  modelToEntity(adminModel: UserAdminModel, baseModel: UserModel): UserAdminEntity {
    return new UserAdminEntity(
      baseModel.id,
      baseModel.createdAt,
      baseModel.name,
      baseModel.email,
      baseModel.password,
      baseModel.active,
      adminModel.salary,
      adminModel.agreedToNewsletter
    );
  }
}
