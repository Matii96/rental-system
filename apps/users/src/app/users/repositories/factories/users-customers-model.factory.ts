import { Injectable } from '@nestjs/common';
import { UserCustomerEntity } from '@rental-system/domain';
import { IEntityModelFactory } from '@rental-system/common';
import { UserCustomerModel } from '../../models/user-customer.model';
import { UserModel } from '../../models/user.model';

@Injectable()
export class UsersCustomersModelFactory implements IEntityModelFactory<UserCustomerEntity, UserCustomerModel> {
  entityToUserModel(user: UserCustomerEntity): UserModel {
    return <UserModel>{
      id: user.id,
      createdAt: user.createdAt,
      name: user.name,
      email: user.email,
      password: user.getPassword(),
    };
  }

  entityToModel(user: UserCustomerEntity): UserCustomerModel {
    return <UserCustomerModel>{
      agreedToNewsletter: user.agreedToNewsletter,
      userId: user.id,
      user: null,
    };
  }

  modelToEntity(customerModel: UserCustomerModel, baseModel: UserModel): UserCustomerEntity {
    return new UserCustomerEntity(
      baseModel.id,
      baseModel.createdAt,
      baseModel.name,
      baseModel.email,
      baseModel.password,
      customerModel.agreedToNewsletter
    );
  }
}
