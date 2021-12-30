import { RentalCardEntity } from '@rental-system/domain';
import { rentalPoliciesReverseMapper } from './common/rental-policies-reverse.mapper';
import { RentalCardModel } from './infrastructure/database/models/rental-card.model';

export const rentalCardModelMock = (card: RentalCardEntity) =>
  <RentalCardModel>{
    id: card.id.toString(),
    ownerId: card.ownerId.toString(),
    rentalPolicyType: rentalPoliciesReverseMapper(card.rentalPolicy),
  };
