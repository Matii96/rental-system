import { UserTypes } from '@rental-system/domain';
import { IMicroserviceQuery } from '../../interfaces/query.interface';

export interface IUserGetByIdMicroserviceQuery extends IMicroserviceQuery {
  type: UserTypes;
}
