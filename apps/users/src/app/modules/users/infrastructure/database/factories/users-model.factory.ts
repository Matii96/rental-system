import { Injectable } from '@nestjs/common';
import { IUser } from '@rental-system/domain';
import { AggregateId, IEntityModelFactory } from '@rental-system/common';
import { UserModel } from '../models/user.model';
import { CustomersModelFactory } from '../../../../customers/infrastructure/database/factories/customers-model.factory';
import { InvalidUserClassException } from '../../exceptions/invalid-user-class.exception';
import { AdminsModelFactory } from '../../../../admins/infrastructure/database/factories/admins-model.factory';

@Injectable()
export class UsersModelFactory implements IEntityModelFactory<IUser, UserModel> {
  constructor(
    private readonly adminsModelFactory: AdminsModelFactory,
    private readonly customersModelFactory: CustomersModelFactory
  ) {}

  entityToModel(user: IUser): UserModel {
    return <UserModel>{
      id: user.id.toString(),
      createdAt: user.createdAt,
      name: user.name,
      email: user.email,
      password: user.getPassword(),
      active: user.isActive(),
    };
  }

  modelToEntity(user: UserModel): IUser {
    if (user.adminData) return this.adminsModelFactory.modelToEntity(user.adminData, user);
    if (user.customerData) return this.customersModelFactory.modelToEntity(user.customerData, user);
    throw new InvalidUserClassException(new AggregateId(user.id));
  }
}
