import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FindAllSearchOptions } from '@rental-system/common';
import { SequelizeGenericRepository } from '@rental-system/database-storage';
import { UserCustomerEntity } from '@rental-system/domain';
import { UsersRepository } from '../../repositories/users.repository';
import { UserCustomerModel } from '../models/user-customer.model';
import { CustomersModelFactory } from './factories/customers-model.factory';

@Injectable({ scope: Scope.REQUEST })
export class CustomersRepository extends SequelizeGenericRepository<UserCustomerEntity, UserCustomerModel> {
  constructor(
    @InjectModel(UserCustomerModel) model: typeof UserCustomerModel,
    modelFactory: CustomersModelFactory,
    private readonly usersRepository: UsersRepository
  ) {
    super(model, modelFactory);
  }

  async create(user: UserCustomerEntity) {
    await this.usersRepository.create(user);
    return super.create(user);
  }

  async update(user: UserCustomerEntity) {
    await this.usersRepository.update(user);
    return super.update(user);
  }
}
