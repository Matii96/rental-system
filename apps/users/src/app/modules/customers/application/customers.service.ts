import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserCustomerEntity } from '@rental-system/domain';
import { CustomerInputDto, CustomerInputSelfDto } from '@rental-system/dto';
import { UsersService } from '../../users/application/users.service';
import { CustomersRepository } from '../infrastructure/database/repositories/customers.repository';
import { CustomersFactory } from './factories/customers.factory';

@Injectable()
export class CustomersService {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
    private readonly factory: CustomersFactory,
    private readonly repository: CustomersRepository
  ) {}

  async create(data: CustomerInputDto): Promise<UserCustomerEntity> {
    const user = this.factory.create(data);
    await this.repository.create(user);
    return user;
  }

  async update(user: UserCustomerEntity, data: CustomerInputDto): Promise<UserCustomerEntity> {
    user.name = data.name;
    user.email = data.email;
    user.setPassword(data.password, this.config.get<number>('PASSWORD_SALT'));
    data.active ? user.activate() : user.deactivate;
    data.agreedToNewsletter ? user.agreeToNewsletter() : user.disagreeToNewsletter();
    await this.repository.update(user);
    return user;
  }

  async updateSelf(user: UserCustomerEntity, data: CustomerInputSelfDto): Promise<UserCustomerEntity> {
    user.name = data.name;
    user.email = data.email;
    user.setPassword(data.password, this.config.get<number>('PASSWORD_SALT'));
    data.agreedToNewsletter ? user.agreeToNewsletter() : user.disagreeToNewsletter();
    await this.repository.update(user);
    return user;
  }

  async delete(user: UserCustomerEntity) {
    await this.usersService.delete(user);
  }
}
