import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FindAllSearchOptions } from '@rental-system/common';
import { UserAdminEntity, UserCustomerEntity } from '@rental-system/domain';
import { SequelizeGenericRepository } from '@rental-system/database-storage';
import { UserAdminModel } from '../models/user-admin.model';
import { UserCustomerModel } from '../models/user-customer.model';
import { UserModel } from '../models/user.model';

@Injectable({ scope: Scope.REQUEST })
export class UsersRepository extends SequelizeGenericRepository<
  UserAdminEntity | UserCustomerEntity,
  UserAdminModel | UserCustomerModel
> {
  constructor(@InjectModel(UserModel) userModel: typeof UserModel, modelFactory: BooksModelFactory) {
    super(userModel, modelFactory);
  }

  findAll(options: FindAllSearchOptions = {}) {
    const search = { [Op.like]: `%${options.search || ''}%` };
    const query: Record<string, unknown>[] = [{ name: search }, { author: search }];
  }
}
