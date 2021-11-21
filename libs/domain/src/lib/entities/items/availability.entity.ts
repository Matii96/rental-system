import { AggregateRoot } from '@nestjs/cqrs';
import { IIdentifiableEntity } from '@rental-system/common';
import { ItemTypes } from '../../enums/item-types.enum';
import { NoItemToReturnException } from '../../exceptions/items/no-item-to-return.exception';
import { ItemNotAvailableException } from '../../exceptions/items/item-not-available.exception';

export class AvailabilityEntity extends AggregateRoot implements IIdentifiableEntity<string> {
  constructor(readonly id: string, readonly type: ItemTypes, private total: number, private reserved: number) {
    super();
  }

  getTotal() {
    return this.total;
  }

  getReserved() {
    return this.reserved;
  }

  setTotal(total: number) {
    this.total = total;
  }

  reserveItem() {
    if (this.reserved >= this.total) {
      throw new ItemNotAvailableException(this.id);
    }
    this.reserved++;
  }

  returnItem() {
    if (this.reserved === 0) {
      throw new NoItemToReturnException();
    }
    this.reserved--;
  }

  toString(): string {
    return `Availability for item id=${this.id}`;
  }
}
