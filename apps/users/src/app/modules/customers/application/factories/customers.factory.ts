import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AggregateId, IEntityFactory } from '@rental-system/common';
import { UserCustomerEntity } from '@rental-system/domain';
import { CustomerInputDto } from '@rental-system/dto';

@Injectable()
export class CustomersFactory implements IEntityFactory<UserCustomerEntity> {
  constructor(private readonly config: ConfigService) {}

  create(data: CustomerInputDto) {
    const user = new UserCustomerEntity(
      new AggregateId(),
      new Date(),
      data.name,
      data.email,
      '', // Set manually below
      data.active,
      data.agreedToNewsletter
    );
    user.setPassword(data.password, this.config.get<number>('PASSWORD_SALT'));
    return user;
  }
}
