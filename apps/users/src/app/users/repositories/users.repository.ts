import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FindAllSearchOptions } from '@rental-system/common';
import { IUser } from '@rental-system/domain';
import { SequelizeGenericRepository } from '@rental-system/database-storage';
import { UserModel } from '../models/user.model';
import { UserAdminModel } from '../admins/models/admin.model';
import { UserCustomerModel } from '../customers/models/user-customer.model';
import { AdminsModelFactory } from '../admins/repositories/factories/admins-model.factory';
import { CustomersModelFactory } from '../customers/repositories/factories/customers-model.factory';
import { InvalidUserClassException } from '../exceptions/invalid-user-class.exception';
import { UsersModelFactory } from './factories/users-model.factory';

@Injectable({ scope: Scope.REQUEST })
export class UsersRepository extends SequelizeGenericRepository<IUser, UserModel> {
  private readonly usersClasses = [UserAdminModel, UserCustomerModel];

  constructor(
    @InjectModel(UserModel) protected readonly model: typeof UserModel,
    modelFactory: UsersModelFactory,
    private readonly adminsModelFactory: AdminsModelFactory,
    private readonly customersModelFactory: CustomersModelFactory
  ) {
    super(model, modelFactory);
  }

  async findAll(options: FindAllSearchOptions = {}): Promise<IUser[]> {
    const search = { [Op.like]: `%${options.search || ''}%` };
    const query: Record<string, unknown>[] = [{ name: search }, { email: search }];

    if (parseInt(options.search)) {
      query.push({ '$adminData.salary$': parseInt(options.search) });
    }

    const users = await this.model.findAll({
      include: this.usersClasses.map((model) => ({ model, required: false })),
      where: { [Op.or]: query },
      ...this.applyOptions(options),
    });

    return users.map((user) => {
      if (user.adminData) return this.adminsModelFactory.modelToEntity(user.adminData, user);
      if (user.customerData) return this.customersModelFactory.modelToEntity(user.customerData, user);
      throw new InvalidUserClassException(user.id);
    });
  }
}
