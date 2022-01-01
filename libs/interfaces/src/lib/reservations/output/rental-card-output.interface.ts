import { RentalPolicies } from '@rental-system/domain';

export interface IRentalCardOutput {
  id: string;
  ownerId: string;
  rentalPolicyType: RentalPolicies;
}
