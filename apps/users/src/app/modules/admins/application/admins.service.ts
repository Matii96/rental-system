import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AggregateId } from '@rental-system/common';
import { UserAdminEntity } from '@rental-system/domain';
import { IAdminInput } from '@rental-system/dto-interfaces';
import { AdminsRepository } from '../infrastructure/database/repositories/admins.repository';
import { AdminInputSelfDto } from '../presentation/dto/input/input-self.dto';
import { AdminsFactory } from './factories/admins.factory';

@Injectable()
export class AdminsService {
  constructor(
    private readonly config: ConfigService,
    private readonly factory: AdminsFactory,
    private readonly repository: AdminsRepository
  ) {}

  getById(id: AggregateId) {
    return this.repository.findById(id);
  }

  async create(data: IAdminInput): Promise<UserAdminEntity> {
    const user = this.factory.create(data);
    await this.repository.create(user);
    return user;
  }

  async update(user: UserAdminEntity, data: IAdminInput): Promise<UserAdminEntity> {
    user.name = data.name;
    user.email = data.email;
    user.setPassword(data.password, parseInt(this.config.get<string>('PASSWORD_SALT')));
    data.active ? user.activate() : user.deactivate;
    data.agreedToNewsletter ? user.agreeToNewsletter() : user.disagreeToNewsletter();
    user.salary = data.salary;
    await this.repository.update(user);
    return user;
  }

  async updateSelf(user: UserAdminEntity, data: AdminInputSelfDto): Promise<UserAdminEntity> {
    user.name = data.name;
    user.email = data.email;
    user.setPassword(data.password, parseInt(this.config.get<string>('PASSWORD_SALT')));
    data.agreedToNewsletter ? user.agreeToNewsletter() : user.disagreeToNewsletter();
    await this.repository.update(user);
    return user;
  }

  async delete(user: UserAdminEntity) {
    await this.repository.delete(user);
  }
}
