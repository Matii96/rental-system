import { IUser } from '@rental-system/domain';
import { IAuthenticatedRequest } from '@rental-system/auth';

export interface IUserRequest extends IAuthenticatedRequest {
  requestUser: IUser;
}
