import { Injectable } from '@nestjs/common';
import { AvailabilityEntity } from '@rental-system/domain';
import { AggregateId, IEntityModelFactory } from '@rental-system/common';
import { AvailabilityModel } from '../models/availability.model';

@Injectable()
export class AvailabilityModelFactory implements IEntityModelFactory<AvailabilityEntity, AvailabilityModel> {
  entityToModel(availability: AvailabilityEntity): AvailabilityModel {
    return <AvailabilityModel>{
      id: availability.id.toString(),
      type: availability.type,
      total: availability.getTotal(),
      reserved: availability.getReserved(),
    };
  }

  modelToEntity(model: AvailabilityModel): AvailabilityEntity {
    return new AvailabilityEntity(new AggregateId(model.id), model.type, model.total, model.reserved);
  }
}
