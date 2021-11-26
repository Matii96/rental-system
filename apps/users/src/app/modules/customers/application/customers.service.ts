import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AggregateId } from '@rental-system/common';
import { UserCustomerEntity } from '@rental-system/domain';
import { ICustomerInput, ICustomerInputSelf } from '@rental-system/dto-interfaces';
import { CustomersFactory } from './factories/customers.factory';
import { CustomersRepository } from '../infrastructure/database/repositories/customers.repository';

@Injectable()
export class CustomersService {
  constructor(
    private readonly config: ConfigService,
    private readonly factory: CustomersFactory,
    private readonly repository: CustomersRepository
  ) {}

  getById(id: AggregateId) {
    return this.repository.findById(id);
  }

  async create(data: ICustomerInput): Promise<UserCustomerEntity> {
    const user = this.factory.create(data);
    await this.repository.create(user);
    return user;
  }

  async update(user: UserCustomerEntity, data: ICustomerInput): Promise<UserCustomerEntity> {
    user.name = data.name;
    user.email = data.email;
    user.setPassword(data.password, parseInt(this.config.get<string>('PASSWORD_SALT')));
    data.active ? user.activate() : user.deactivate;
    data.agreedToNewsletter ? user.agreeToNewsletter() : user.disagreeToNewsletter();
    await this.repository.update(user);
    return user;
  }

  async updateSelf(user: UserCustomerEntity, data: ICustomerInputSelf): Promise<UserCustomerEntity> {
    user.name = data.name;
    user.email = data.email;
    user.setPassword(data.password, parseInt(this.config.get<string>('PASSWORD_SALT')));
    data.agreedToNewsletter ? user.agreeToNewsletter() : user.disagreeToNewsletter();
    await this.repository.update(user);
    return user;
  }

  async delete(user: UserCustomerEntity) {
    await this.repository.delete(user);
  }
}
