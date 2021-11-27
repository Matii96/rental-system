import { AggregateRoot } from '@nestjs/cqrs';
import { AggregateId, IIdentifiableEntity } from '@rental-system/common';
import { ItemTypes } from '../../enums/item-types.enum';
import { NoItemToReturnException } from '../../exceptions/items/no-item-to-return.exception';
import { ItemNotAvailableException } from '../../exceptions/items/item-not-available.exception';
import { NotEnoughItemsTotalException } from '../../exceptions/items/not-enough-items-total.exception';

export class AvailabilityEntity extends AggregateRoot implements IIdentifiableEntity {
  constructor(readonly id: AggregateId, readonly type: ItemTypes, private total: number, private reserved: number) {
    super();
  }

  getTotal() {
    return this.total;
  }

  getReserved() {
    return this.reserved;
  }

  setTotal(total: number) {
    if (total < this.reserved) {
      throw new NotEnoughItemsTotalException(this.id, this.reserved);
    }
    this.total = total;
  }

  reserveItem() {
    const newReserved = this.reserved + 1;
    if (newReserved > this.total) {
      throw new ItemNotAvailableException(this.id);
    }
    this.reserved = newReserved;
  }

  returnItem() {
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
