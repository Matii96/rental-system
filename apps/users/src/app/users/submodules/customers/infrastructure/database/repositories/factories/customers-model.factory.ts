import { Injectable } from '@nestjs/common';
import { UserCustomerEntity } from '@rental-system/domain';
import { IEntityModelFactory } from '@rental-system/common';
import { UserModel } from '../../../../../../infrastructure/database/models/user.model';
import { UserCustomerModel } from '../../models/user-customer.model';

@Injectable()
export class CustomersModelFactory implements IEntityModelFactory<UserCustomerEntity, UserCustomerModel> {
  entityToModel(user: UserCustomerEntity): UserCustomerModel {
    return <UserCustomerModel>{
      id: user.id,
      base: null,
      agreedToNewsletter: user.agreedToNewsletter,
    };
  }

  modelToEntity(customerModel: UserCustomerModel, baseModel: UserModel): UserCustomerEntity {
    return new UserCustomerEntity(
      baseModel.id,
      baseModel.createdAt,
      baseModel.name,
      baseModel.email,
      baseModel.password,
      baseModel.active,
      customerModel.agreedToNewsletter
    );
  }
}
