import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { AggregateId, IEntityFactory } from '@rental-system/common';
import { RentalCardEntity, RentalEntity } from '@rental-system/domain';
import { RentalCreateInputDto } from '@rental-system/dto';

@Injectable()
export class RentalsFactory implements IEntityFactory<RentalEntity> {
  constructor(private readonly config: ConfigService) {}

  create(card: RentalCardEntity, data: RentalCreateInputDto) {
    return new RentalEntity(
      new AggregateId(uuidv4()),
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
