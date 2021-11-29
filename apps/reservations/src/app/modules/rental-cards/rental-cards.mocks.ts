import { RentalCardEntity, RentalPoliciesMapper } from '@rental-system/domain';
import { RentalCardModel } from './infrastructure/database/models/rental-card.model';

export const rentalCardModelMock = (card: RentalCardEntity) =>
  <RentalCardModel>{
    id: card.id.toString(),
    ownerId: card.ownerId.toString(),
    rentalPolicyType:
      Object.keys(RentalPoliciesMapper)[
        Object.values(RentalPoliciesMapper).findIndex((policy) => card.rentalPolicy instanceof policy)
      ],
  };
