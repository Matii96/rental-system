import { RentalPolicies } from '@rental-system/domain';

export class RentalCardCreateInputDto {
  readonly ownerId: string;
  readonly rentalPolicyType: RentalPolicies;
}
