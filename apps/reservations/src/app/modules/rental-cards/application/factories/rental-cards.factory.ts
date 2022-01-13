import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { RentalCardEntity, RentalPoliciesMapper } from '@rental-system/domain';
import { AggregateId, IEntityFactory } from '@rental-system/common';
import { RentalCardCreateInputDto } from '@rental-system/dto';

@Injectable()
export class RentalCardsFactory implements IEntityFactory<RentalCardEntity> {
  constructor(private readonly config: ConfigService) {}

  create(data: RentalCardCreateInputDto) {
    return new RentalCardEntity(
      new AggregateId(uuidv4()),
      new AggregateId(data.ownerId),
      [],
      new RentalPoliciesMapper[data.rentalPolicyType]({
        countLimit: this.config.get<number>('RENTAL_POLICY_COUNT_LIMIT'),
      })
    );
  }
}
