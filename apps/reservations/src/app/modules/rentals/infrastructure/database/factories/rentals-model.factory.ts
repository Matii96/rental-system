import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AggregateId, IEntityModelFactory } from '@rental-system/common';
import { RentalEntity } from '@rental-system/domain';
import { RentalModel } from '../models/rental.model';

@Injectable()
export class RentalsModelFactory implements IEntityModelFactory<RentalEntity, RentalModel> {
  constructor(private readonly config: ConfigService) {}

  entityToModel(rental: RentalEntity): RentalModel {
    return <RentalModel>{
      id: rental.id.toString(),
      itemId: rental.itemId.toString(),
      cardId: rental.cardId.toString(),
      returnDate: rental.getReturnDate(),
      expectedReturnDate: rental.getExpectedReturnDate(),
      prolongCounter: rental.getProlongCounter(),
    };
  }

  modelToEntity(model: RentalModel): RentalEntity {
    return new RentalEntity(
      new AggregateId(model.id),
      new AggregateId(model.cardId),
      new AggregateId(model.itemId),
      model.createdAt,
      model.returnDate,
      model.expectedReturnDate,
      model.prolongCounter,
      this.config.get<number>('RENTAL_MAX_PROLONGATIONS')
    );
  }
}
