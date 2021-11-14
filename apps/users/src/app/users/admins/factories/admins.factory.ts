import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { IEntityFactory } from '@rental-system/common';
import { UserAdminEntity } from '@rental-system/domain';
import { AdminInputDto } from '../dto/input.dto';

@Injectable()
export class AdminsFactory implements IEntityFactory<UserAdminEntity> {
  constructor(private readonly config: ConfigService) {}

  create(data: AdminInputDto) {
    const user = new UserAdminEntity(
      uuidv4(),
      new Date(),
      data.name,
      data.email,
      'password', // Set manually below
      data.active,
      data.salary,
      data.agreedToNewsletter
    );
    user.setPassword(data.password, parseInt(this.config.get<string>('PASSWORD_SALT')));
    return user;
  }
}
