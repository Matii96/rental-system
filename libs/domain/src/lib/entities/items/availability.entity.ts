import { AggregateId, IIdentifiableEntity } from '@rental-system/common';
import { ItemTypes } from '../../enums/item-types.enum';
import { NoItemToReturnException } from '../../exceptions/items/no-item-to-return.exception';
import { ItemNotAvailableException } from '../../exceptions/items/item-not-available.exception';
import { NotEnoughItemsTotalException } from '../../exceptions/items/not-enough-items-total.exception';

export class AvailabilityEntity implements IIdentifiableEntity {
  constructor(readonly id: AggregateId, readonly type: ItemTypes, private total: number, private reserved: number) {}

  getTotal() {
    return this.total;
  }

  getReserved() {
    return this.reserved;
  }

  setTotal(total: number) {
    if (total < this.reserved) {
      throw new NotEnoughItemsTotalException(this);
    }
    this.total = total;
  }

  reserveItem() {
    const newReserved = this.reserved + 1;
    if (newReserved > this.total) {
      throw new ItemNotAvailableException(this);
    }
    this.reserved = newReserved;
  }

  releaseItem() {
    const newReserved = this.reserved - 1;
    if (newReserved <= 0) {
      throw new NoItemToReturnException();
    }
    this.reserved = newReserved;
  }

  toString(): string {
    return `Availability for item id=${this.id}`;
  }
}
