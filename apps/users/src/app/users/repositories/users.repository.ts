import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FindAllSearchOptions } from '@rental-system/common';
import { InvalidLoginException, IUser } from '@rental-system/domain';
import { SequelizeGenericRepository } from '@rental-system/database-storage';
import { UserModel } from '../models/user.model';
import { UserAdminModel } from '../admins/models/admin.model';
import { UserCustomerModel } from '../customers/models/user-customer.model';
import { UsersModelFactory } from './factories/users-model.factory';

@Injectable()
export class UsersRepository extends SequelizeGenericRepository<IUser, UserModel> {
  private readonly usersModels = [UserAdminModel, UserCustomerModel];

  constructor(@InjectModel(UserModel) protected readonly model: typeof UserModel, modelFactory: UsersModelFactory) {
    super(model, modelFactory);
  }

  async findAll(options: FindAllSearchOptions = {}): Promise<IUser[]> {
    const search = { [Op.like]: `%${options.search || ''}%` };
    const query: Record<string, unknown>[] = [{ name: search }, { email: search }];

    if (parseInt(options.search)) {
      query.push({ '$adminData.salary$': parseInt(options.search) });
    }

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
      },
    });

    if (!user) throw new InvalidLoginException();
    return this.modelFactory.modelToEntity(user);
  }
}
