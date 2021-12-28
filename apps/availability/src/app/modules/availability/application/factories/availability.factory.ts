import { Injectable } from '@nestjs/common';
import { AvailabilityEntity } from '@rental-system/domain';
import { AggregateId, IEntityFactory } from '@rental-system/common';
import { IChangeStateAvailabilityInput } from '@rental-system/interfaces';

@Injectable()
export class AvailabilityFactory implements IEntityFactory<AvailabilityEntity> {
  create(data: IChangeStateAvailabilityInput) {
    return new AvailabilityEntity(new AggregateId(data.id), data.type, 0, 0);
  }
}
