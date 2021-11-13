import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FindAllSearchOptions } from '@rental-system/common';
import { SequelizeGenericRepository } from '@rental-system/database-storage';
import { UserAdminEntity } from '@rental-system/domain';
import { UserAdminModel } from '../models/admin.model';
import { AdminsModelFactory } from './factories/admins-model.factory';
import { UsersRepository } from '../../repositories/users.repository';

@Injectable({ scope: Scope.REQUEST })
export class AdminsRepository extends SequelizeGenericRepository<UserAdminEntity, UserAdminModel> {
  constructor(
    @InjectModel(UserAdminModel) model: typeof UserAdminModel,
    modelFactory: AdminsModelFactory,
    private readonly usersRepository: UsersRepository
  ) {
    super(model, modelFactory);
  }

  async create(user: UserAdminEntity) {
    await this.usersRepository.create(user);
    return super.create(user);
  }

  async update(user: UserAdminEntity) {
    await this.usersRepository.update(user);
    return super.update(user);
  }
}
