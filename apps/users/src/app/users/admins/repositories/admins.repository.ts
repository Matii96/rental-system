import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeGenericRepository } from '@rental-system/database-storage';
import { UserAdminEntity } from '@rental-system/domain';
import { UsersRepository } from '../../repositories/users.repository';
import { UserAdminModel } from '../models/admin.model';
import { UserModel } from '../../models/user.model';
import { AdminsModelFactory } from './factories/admins-model.factory';

@Injectable()
export class AdminsRepository extends SequelizeGenericRepository<UserAdminEntity, UserAdminModel> {
  constructor(
    @InjectModel(UserAdminModel) model: typeof UserAdminModel,
    modelFactory: AdminsModelFactory,
    private readonly usersRepository: UsersRepository,
    private readonly sequelize: Sequelize
  ) {
    super(model, modelFactory);
  }

  async findById(id: string) {
    const user = <UserAdminModel>await this.model.findByPk(id, { include: [{ model: UserModel }] });
    if (!user) throw new NotFoundException();
    return this.modelFactory.modelToEntity(user, user.base);
  }

  async create(user: UserAdminEntity) {
    return this.sequelize.transaction(async (t) => {
      await this.usersRepository.create(user, t);
      return await super.create(user, t);
    });
  }

  async update(user: UserAdminEntity) {
    return this.sequelize.transaction(async (t) => {
      await this.usersRepository.update(user, t);
      return await super.update(user, t);
    });
  }
}
