import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AggregateId, FindAllSearchOptions } from '@rental-system/common';
import { InvalidLoginException, IUser } from '@rental-system/domain';
import { SequelizeGenericRepository } from '@rental-system/database-storage';
import { UserAdminModel } from '../../../../admins/infrastructure/database/models/admin.model';
import { UserCustomerModel } from '../../../../customers/infrastructure/database/models/user-customer.model';
import { UsersModelFactory } from '../factories/users-model.factory';
import { UserModel } from '../models/user.model';

@Injectable()
export class UsersRepository extends SequelizeGenericRepository<IUser, UserModel> {
  private readonly usersModels = [UserAdminModel, UserCustomerModel];

  constructor(
    sequelize: Sequelize,
    @InjectModel(UserModel) protected readonly model: typeof UserModel,
    modelFactory: UsersModelFactory
  ) {
    super(sequelize, model, modelFactory);
  }

  async findById(id: AggregateId, transaction?: Transaction): Promise<IUser> {
    const user = await this.model.findByPk(id.toString(), {
      include: this.usersModels.map((model) => ({ model, required: false })),
    });
    return this.modelFactory.modelToEntity(user);
  }

  async findAll(options: FindAllSearchOptions = {}): Promise<IUser[]> {
    const search = { [Op.like]: `%${options.search || ''}%` };
    const query: Record<string, unknown>[] = [{ name: search }, { email: search }];

    const users = await this.model.findAll({
      include: this.usersModels.map((model) => ({ model, required: false })),
      where: { [Op.or]: query },
      ...this.applyOptions(options),
    });

    return users.map((user) => this.modelFactory.modelToEntity(user));
  }

  async findByLogin(nameOrEmail: string): Promise<IUser> {
    const user = await this.model.findOne({
      include: this.usersModels.map((model) => ({ model, required: false })),
      where: {
        [Op.or]: [{ name: nameOrEmail }, { email: nameOrEmail }],
        password: { [Op.ne]: null },
        active: true,
      },
    });

    if (!user) throw new InvalidLoginException();
    return this.modelFactory.modelToEntity(user);
  }
}
