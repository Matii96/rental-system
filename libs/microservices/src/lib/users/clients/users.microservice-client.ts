import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { AggregateId } from '@rental-system/common';
import { IUser, UsersMapper } from '@rental-system/domain';
import { MicroservicesEnum } from '../../microservices.enum';
import { UserGetByIdQueryPattern } from '../queries/get-by-id.query-pattern';

@Injectable()
export class UsersMicroserviceClient {
  constructor(@Inject(MicroservicesEnum.USERS) private readonly usersClient: ClientProxy) {}

  async getById(id: AggregateId) {
    const userData = await firstValueFrom(this.usersClient.send<IUser>(new UserGetByIdQueryPattern(), id));
    return plainToClass(<ClassConstructor<IUser>>UsersMapper[userData.type], userData);
  }
}
