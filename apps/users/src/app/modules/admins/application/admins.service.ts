import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserAdminEntity } from '@rental-system/domain';
import { AdminsRepository } from '../infrastructure/database/repositories/admins.repository';
import { AdminInputSelfDto } from '../presentation/dto/input/input-self.dto';
import { AdminInputDto } from '../presentation/dto/input/input.dto';
import { AdminOutputDto } from '../presentation/dto/output.dto';
import { AdminsFactory } from './factories/admins.factory';

@Injectable()
export class AdminsService {
  constructor(
    private readonly config: ConfigService,
    private readonly factory: AdminsFactory,
    private readonly repository: AdminsRepository
  ) {}

  async getById(id: string): Promise<AdminOutputDto> {
    const user = await this.repository.findById(id);
    return new AdminOutputDto(user);
  }

  async create(data: AdminInputDto): Promise<AdminOutputDto> {
    const user = this.factory.create(data);
    await this.repository.create(user);
    return new AdminOutputDto(user);
  }

  async update(user: UserAdminEntity, data: AdminInputDto): Promise<AdminOutputDto> {
    user.name = data.name;
    user.email = data.email;
    user.setPassword(data.password, parseInt(this.config.get<string>('PASSWORD_SALT')));
    data.active ? user.activate() : user.deactivate;
    data.agreedToNewsletter ? user.agreeToNewsletter() : user.disagreeToNewsletter();
    user.salary = data.salary;
    await this.repository.update(user);
    return new AdminOutputDto(user);
  }

  async updateSelf(user: UserAdminEntity, data: AdminInputSelfDto): Promise<AdminOutputDto> {
    user.name = data.name;
    user.email = data.email;
    user.setPassword(data.password, parseInt(this.config.get<string>('PASSWORD_SALT')));
    data.agreedToNewsletter ? user.agreeToNewsletter() : user.disagreeToNewsletter();
    await this.repository.update(user);
    return new AdminOutputDto(user);
  }

  async delete(user: UserAdminEntity): Promise<AdminOutputDto> {
    await this.repository.delete(user);
    return new AdminOutputDto(user);
  }
}
