import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AggregateId } from '@rental-system/common';
import { UserCustomerEntity } from '@rental-system/domain';
import { SequelizeGenericRepository } from '@rental-system/database-storage';
import { UserModel } from '../../../../users/infrastructure/database/models/user.model';
import { UsersRepository } from '../../../../users/infrastructure/database/repositories/users.repository';
import { UserCustomerModel } from '../models/user-customer.model';
import { CustomersModelFactory } from '../factories/customers-model.factory';

@Injectable()
export class CustomersRepository extends SequelizeGenericRepository<UserCustomerEntity, UserCustomerModel> {
  constructor(
    sequelize: Sequelize,
    @InjectModel(UserCustomerModel) model: typeof UserCustomerModel,
    modelFactory: CustomersModelFactory,
    private readonly usersRepository: UsersRepository
  ) {
    super(sequelize, model, modelFactory);
  }

  async findById(id: AggregateId) {
    const user = <UserCustomerModel>await this.model.findByPk(id.toString(), { include: [{ model: UserModel }] });
    if (!user) throw new NotFoundException();
    return this.modelFactory.modelToEntity(user, user.base);
  }

  async create(user: UserCustomerEntity) {
    return this.sequelize.transaction(async (t) => {
      await this.usersRepository.create(user, t);
      return super.create(user, t);
    });
  }

  async update(user: UserCustomerEntity) {
    return this.sequelize.transaction(async (t) => {
      await this.usersRepository.update(user, t);
      return super.update(user, t);
    });
  }

  async delete(user: UserCustomerEntity) {
    await this.usersRepository.delete(user);
    return user;
  }
}
