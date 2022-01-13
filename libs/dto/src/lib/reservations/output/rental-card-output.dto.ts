import { reverseClassMapper } from '@rental-system/common';
import { RentalCardEntity, RentalPolicies, RentalPoliciesMapper } from '@rental-system/domain';

export class RentalCardOutputDto {
  readonly id: string;
  readonly ownerId: string;
  readonly rentalPolicyType: RentalPolicies;

  constructor(card: RentalCardEntity) {
    this.id = card.id.toString();
    this.ownerId = card.ownerId.toString();
    this.rentalPolicyType = <RentalPolicies>reverseClassMapper(RentalPoliciesMapper, card.rentalPolicy);
  }
}
