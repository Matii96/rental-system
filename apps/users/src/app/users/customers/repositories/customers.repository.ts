import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { FindAllSearchOptions } from '@rental-system/common';
import { SequelizeGenericRepository } from '@rental-system/database-storage';
import { UserCustomerEntity } from '@rental-system/domain';
import { UsersRepository } from '../../repositories/users.repository';
import { UserCustomerModel } from '../models/user-customer.model';
import { CustomersModelFactory } from './factories/customers-model.factory';

@Injectable()
export class CustomersRepository extends SequelizeGenericRepository<UserCustomerEntity, UserCustomerModel> {
  constructor(
    @InjectModel(UserCustomerModel) model: typeof UserCustomerModel,
    modelFactory: CustomersModelFactory,
    private readonly usersRepository: UsersRepository,
    private readonly sequelize: Sequelize
  ) {
    super(model, modelFactory);
  }

  async create(user: UserCustomerEntity) {
    return this.sequelize.transaction(async (t) => {
      await this.usersRepository.create(user, t);
      return await super.create(user, t);
    });
  }

  async update(user: UserCustomerEntity) {
    return this.sequelize.transaction(async (t) => {
      await this.usersRepository.update(user, t);
      return await super.update(user, t);
    });
  }
}
