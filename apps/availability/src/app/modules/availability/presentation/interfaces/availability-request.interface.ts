import { AvailabilityEntity } from '@rental-system/domain';
import { IAuthenticatedRequest } from '@rental-system/auth';

export interface IAvailabilityRequest extends IAuthenticatedRequest {
  availability: AvailabilityEntity;
}
