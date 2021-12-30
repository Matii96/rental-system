import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AggregateId, IEntityModelFactory } from '@rental-system/common';
import { RentalCardEntity, RentalEntity, RentalPoliciesMapper } from '@rental-system/domain';
import { rentalPoliciesReverseMapper } from '../../../common/rental-policies-reverse.mapper';
import { RentalCardModel } from '../models/rental-card.model';

@Injectable()
export class RentalCardsModelFactory implements IEntityModelFactory<RentalCardEntity, RentalCardModel> {
  constructor(private readonly config: ConfigService) {}

  entityToModel(card: RentalCardEntity): RentalCardModel {
    return <RentalCardModel>{
      id: card.id.toString(),
      ownerId: card.ownerId.toString(),
      rentalPolicyType: rentalPoliciesReverseMapper(card.rentalPolicy),
    };
  }

  modelToEntity(model: RentalCardModel, activeRentals: RentalEntity[]): RentalCardEntity {
    return new RentalCardEntity(
      new AggregateId(model.id),
      new AggregateId(model.ownerId),
      activeRentals.map((rental) => rental.id),
      new RentalPoliciesMapper[model.rentalPolicyType]({
        countLimit: this.config.get<number>('RENTAL_POLICY_COUNT_LIMIT'),
      })
    );
  }
}
