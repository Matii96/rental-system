import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AggregateId, IEntityFactory } from '@rental-system/common';
import { RentalCardEntity, RentalEntity } from '@rental-system/domain';
import { RentalCreateInputDto } from '@rental-system/dto';

@Injectable()
export class RentalsFactory implements IEntityFactory<RentalEntity> {
  constructor(private readonly config: ConfigService) {}

  create(card: RentalCardEntity, data: RentalCreateInputDto) {
    return new RentalEntity(
      new AggregateId(),
      card.id,
      new AggregateId(data.itemId),
      new Date(),
      null,
      new Date(data.expectedReturnDate),
      0,
      this.config.get<number>('RENTAL_MAX_PROLONGATIONS')
    );
  }
}
