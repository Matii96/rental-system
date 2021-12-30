import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AggregateId } from '@rental-system/common';
import { SequelizeGenericRepository } from '@rental-system/database-storage';
import { UserAdminEntity } from '@rental-system/domain';
import { UsersRepository } from '../../../../users/infrastructure/database/repositories/users.repository';
import { UserModel } from '../../../../users/infrastructure/database/models/user.model';
import { UserAdminModel } from '../models/admin.model';
import { AdminsModelFactory } from '../factories/admins-model.factory';

@Injectable()
export class AdminsRepository extends SequelizeGenericRepository<UserAdminEntity, UserAdminModel> {
  constructor(
    sequelize: Sequelize,
    @InjectModel(UserAdminModel) model: typeof UserAdminModel,
    modelFactory: AdminsModelFactory,
    private readonly usersRepository: UsersRepository
  ) {
    super(sequelize, model, modelFactory);
  }

  async findById(id: AggregateId) {
    const user = <UserAdminModel>await this.model.findByPk(id.toString(), { include: [{ model: UserModel }] });
    if (!user) throw new NotFoundException();
    return this.modelFactory.modelToEntity(user, user.base);
  }

  async create(user: UserAdminEntity) {
    return this.sequelize.transaction(async (t) => {
      await this.usersRepository.create(user, t);
      return super.create(user, t);
    });
  }

  async update(user: UserAdminEntity) {
    return this.sequelize.transaction(async (t) => {
      await this.usersRepository.update(user, t);
      return super.update(user, t);
    });
  }
}
