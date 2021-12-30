import { RentalCardEntity } from '@rental-system/domain';
import { IAuthenticatedRequest } from '@rental-system/auth';

export interface IRentalCardRequest extends IAuthenticatedRequest {
  rentalCard: RentalCardEntity;
}
