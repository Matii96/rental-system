import { AggregateRoot } from '@nestjs/cqrs';
import { IIdentifiableEntity } from '@rental-system/common';
import { ItemTypes } from '../../enums/item-types.enum';

export class AvailabilityEntity extends AggregateRoot implements IIdentifiableEntity<string> {
  constructor(readonly id: string, readonly type: ItemTypes, private total: number, private reserved: number) {
    super();
  }

  reserveItem() {
    this.reserved++;
  }

  returnItem() {
    this.reserved--;
  }

  toString(): string {
    return `Availability for item id=${this.id}`;
  }
}
