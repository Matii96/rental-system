import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IEntityFactory } from '@rental-system/common';
import { UserAdminEntity } from '@rental-system/domain';

@Injectable()
export class BooksFactory implements IEntityFactory<UserAdminEntity> {
  create(data: UserAdminInputDto) {
    return new UserAdminEntity(uuidv4(), new Date());
  }
}
