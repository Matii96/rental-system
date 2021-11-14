import { UserAdminEntity } from '@rental-system/domain';
import { IAuthenticatedRequest } from '@rental-system/auth';

export interface IAdminRequest extends IAuthenticatedRequest {
  admin: UserAdminEntity;
}
