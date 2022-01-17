import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AggregateId, IEntityFactory } from '@rental-system/common';
import { UserAdminEntity } from '@rental-system/domain';
import { AdminInputDto } from '@rental-system/dto';

@Injectable()
export class AdminsFactory implements IEntityFactory<UserAdminEntity> {
  constructor(private readonly config: ConfigService) {}

  create(data: AdminInputDto) {
    const user = new UserAdminEntity(
      new AggregateId(),
      new Date(),
      data.name,
      data.email,
      'password', // Set manually below
      data.active,
      data.salary,
      data.agreedToNewsletter
    );
    user.setPassword(data.password, this.config.get<number>('PASSWORD_SALT'));
    return user;
  }
}
