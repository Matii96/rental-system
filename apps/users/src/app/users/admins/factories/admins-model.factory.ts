import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IEntityFactory } from '@rental-system/common';
import { UserAdminEntity } from '@rental-system/domain';
import { AdminInputDto } from '../dto/input.dto';

@Injectable()
export class AdminsFactory implements IEntityFactory<UserAdminEntity> {
  create(data: AdminInputDto) {
    return new UserAdminEntity(
      uuidv4(),
      new Date(),
      data.name,
      data.email,
      data.password,
      data.salary,
      data.agreedToNewsletter
    );
  }
}
