import { Injectable } from '@nestjs/common';
import { IUser } from '@rental-system/domain';
import { IEntityModelFactory } from '@rental-system/common';
import { UserModel } from '../../models/user.model';
import { AdminsModelFactory } from '../../admins/repositories/factories/admins-model.factory';
import { CustomersModelFactory } from '../../customers/repositories/factories/customers-model.factory';
import { InvalidUserClassException } from '../../exceptions/invalid-user-class.exception';

@Injectable()
export class UsersModelFactory implements IEntityModelFactory<IUser, UserModel> {
  constructor(
    private readonly adminsModelFactory: AdminsModelFactory,
    private readonly customersModelFactory: CustomersModelFactory
  ) {}

  entityToModel(user: IUser): UserModel {
    return <UserModel>{
      id: user.id,
      createdAt: user.createdAt,
      name: user.name,
      email: user.email,
      password: user.getPassword(),
    };
  }

  modelToEntity(user: UserModel): IUser {
    if (user.adminData) return this.adminsModelFactory.modelToEntity(user.adminData, user);
    if (user.customerData) return this.customersModelFactory.modelToEntity(user.customerData, user);
    throw new InvalidUserClassException(user.id);
  }
}
