import { Injectable } from '@nestjs/common';
import { AvailabilityEntity } from '@rental-system/domain';
import { AggregateId, IEntityFactory } from '@rental-system/common';
import { AvailabilityCreateInputDto } from '@rental-system/dto';

@Injectable()
export class AvailabilityFactory implements IEntityFactory<AvailabilityEntity> {
  create(data: AvailabilityCreateInputDto) {
    return new AvailabilityEntity(new AggregateId(data.id), data.type, 0, 0);
  }
}
