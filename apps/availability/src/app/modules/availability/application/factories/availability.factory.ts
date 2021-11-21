import { Injectable } from '@nestjs/common';
import { AvailabilityEntity, IItem } from '@rental-system/domain';
import { IEntityFactory } from '@rental-system/common';

@Injectable()
export class AvailabilityFactory implements IEntityFactory<AvailabilityEntity> {
  create(item: IItem) {
    return new AvailabilityEntity(item.id, item.type, 0, 0);
  }
}
