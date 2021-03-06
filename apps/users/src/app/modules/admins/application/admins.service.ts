import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserAdminEntity } from '@rental-system/domain';
import { AdminInputDto, AdminInputSelfDto } from '@rental-system/dto';
import { UsersService } from '../../users/application/users.service';
import { AdminsRepository } from '../infrastructure/database/repositories/admins.repository';
import { AdminsFactory } from './factories/admins.factory';

@Injectable()
export class AdminsService {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
    private readonly factory: AdminsFactory,
    private readonly repository: AdminsRepository
  ) {}

  async create(data: AdminInputDto): Promise<UserAdminEntity> {
    const user = this.factory.create(data);
    await this.repository.create(user);
    return user;
  }

  async update(user: UserAdminEntity, data: AdminInputDto): Promise<UserAdminEntity> {
    user.name = data.name;
    user.email = data.email;
    user.setPassword(data.password, this.config.get<number>('PASSWORD_SALT'));
    data.active ? user.activate() : user.deactivate;
    data.agreedToNewsletter ? user.agreeToNewsletter() : user.disagreeToNewsletter();
    user.salary = data.salary;
    await this.repository.update(user);
    return user;
  }

  async updateSelf(user: UserAdminEntity, data: AdminInputSelfDto): Promise<UserAdminEntity> {
    user.name = data.name;
    user.email = data.email;
    user.setPassword(data.password, this.config.get<number>('PASSWORD_SALT'));
    data.agreedToNewsletter ? user.agreeToNewsletter() : user.disagreeToNewsletter();
    await this.repository.update(user);
    return user;
  }

  async delete(user: UserAdminEntity) {
    await this.usersService.delete(user);
  }
}
