import { ApiProperty } from '@nestjs/swagger';
import { RentalCardEntity, RentalPolicies } from '@rental-system/domain';
import { IRentalCardOutput } from '@rental-system/interfaces';
import { rentalPoliciesReverseMapper } from '../../common/rental-policies-reverse.mapper';

export class RentalCardOutputDto implements IRentalCardOutput {
  @ApiProperty()
  id: string;

  @ApiProperty()
  ownerId: string;

  @ApiProperty()
  rentalPolicyType: RentalPolicies;

  constructor(card: RentalCardEntity) {
    this.id = card.id.toString();
    this.ownerId = card.ownerId.toString();
    this.rentalPolicyType = rentalPoliciesReverseMapper(card.rentalPolicy);
  }
}
