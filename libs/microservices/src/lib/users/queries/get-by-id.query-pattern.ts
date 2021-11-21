import { UserTypes } from '@rental-system/domain';
import { IMicroserviceQuery } from '../../interfaces/query.interface';

export class UserGetByIdQueryPattern implements IMicroserviceQuery {
  readonly query = 'GET_USER_BY_ID';
  constructor(readonly type: UserTypes) {}
}
