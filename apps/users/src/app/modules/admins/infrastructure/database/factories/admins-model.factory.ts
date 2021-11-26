import { Injectable } from '@nestjs/common';
import { UserAdminEntity } from '@rental-system/domain';
import { AggregateId, IEntityModelFactory } from '@rental-system/common';
import { UserModel } from '../../../../users/infrastructure/database/models/user.model';
import { UserAdminModel } from '../models/admin.model';

@Injectable()
export class AdminsModelFactory implements IEntityModelFactory<UserAdminEntity, UserAdminModel> {
  entityToModel(user: UserAdminEntity): UserAdminModel {
    return <UserAdminModel>{
      id: user.id.toString(),
      base: null,
      agreedToNewsletter: user.agreedToNewsletter,
      salary: user.salary,
    };
  }

  modelToEntity(adminModel: UserAdminModel, baseModel: UserModel): UserAdminEntity {
    return new UserAdminEntity(
      new AggregateId(baseModel.id),
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
