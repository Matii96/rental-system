import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserCustomerEntity } from '@rental-system/domain';
import { CustomerInputSelfDto } from './dto/input/input-self.dto';
import { CustomerInputDto } from './dto/input/input.dto';
import { CustomerOutputDto } from './dto/output.dto';
import { CustomersFactory } from './factories/customers.factory';
import { CustomersRepository } from './repositories/customers.repository';

@Injectable()
export class CustomersService {
  constructor(
    private readonly config: ConfigService,
    private readonly factory: CustomersFactory,
    private readonly repository: CustomersRepository
  ) {}

  async getById(id: string): Promise<CustomerOutputDto> {
    const user = await this.repository.findById(id);
    return new CustomerOutputDto(user);
  }

  async create(data: CustomerInputDto): Promise<CustomerOutputDto> {
    const user = this.factory.create(data);
    await this.repository.create(user);
    return new CustomerOutputDto(user);
  }

  async update(user: UserCustomerEntity, data: CustomerInputDto): Promise<CustomerOutputDto> {
    user.name = data.name;
    user.email = data.email;
    user.setPassword(data.password, parseInt(this.config.get<string>('PASSWORD_SALT')));
    data.active ? user.activate() : user.deactivate;
    data.agreedToNewsletter ? user.agreeToNewsletter() : user.disagreeToNewsletter();
    await this.repository.update(user);
    return new CustomerOutputDto(user);
  }

  async updateSelf(user: UserCustomerEntity, data: CustomerInputSelfDto): Promise<CustomerOutputDto> {
    user.name = data.name;
    user.email = data.email;
    user.setPassword(data.password, parseInt(this.config.get<string>('PASSWORD_SALT')));
    data.agreedToNewsletter ? user.agreeToNewsletter() : user.disagreeToNewsletter();
    await this.repository.update(user);
    return new CustomerOutputDto(user);
  }

  async delete(user: UserCustomerEntity): Promise<CustomerOutputDto> {
    await this.repository.delete(user);
    return new CustomerOutputDto(user);
  }
}
