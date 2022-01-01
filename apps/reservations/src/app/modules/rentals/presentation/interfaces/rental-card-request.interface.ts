import { RentalEntity } from '@rental-system/domain';
import { IAuthenticatedRequest } from '@rental-system/auth';

export interface IRentalRequest extends IAuthenticatedRequest {
  rental: RentalEntity;
}
