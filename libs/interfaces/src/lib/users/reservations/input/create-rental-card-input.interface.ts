import { RentalPolicies } from '@rental-system/domain';

export interface ICreateRentalCardInput {
  ownerId: string;
  rentalPolicyType: RentalPolicies;
}
