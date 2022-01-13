import { RentalPolicies } from '@rental-system/domain';

export class RentalCardUpdateInputDto {
  readonly rentalPolicyType: RentalPolicies;
}
