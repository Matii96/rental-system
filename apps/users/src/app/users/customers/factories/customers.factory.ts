import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { IEntityFactory } from '@rental-system/common';
import { UserCustomerEntity } from '@rental-system/domain';
import { CustomerInputDto } from '../dto/input.dto';

@Injectable()
export class CustomersFactory implements IEntityFactory<UserCustomerEntity> {
  constructor(private readonly config: ConfigService) {}

  create(data: CustomerInputDto) {
    const user = new UserCustomerEntity(
      uuidv4(),
      new Date(),
      data.name,
      data.email,
      'password', // Set manually below
      data.agreedToNewsletter
    );
    user.setPassword(data.password, parseInt(this.config.get<string>('PASSWORD_SALT')));
    return user;
  }
}
