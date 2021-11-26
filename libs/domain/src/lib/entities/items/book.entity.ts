import { AggregateId } from '@rental-system/common';
import { IItem } from '../../interfaces/item.interface';
import { ItemTypes } from '../../enums/item-types.enum';
import { ItemEntity } from './item.entity';

export class BookEntity extends ItemEntity implements IItem {
  readonly type = ItemTypes.BOOK;

  constructor(id: AggregateId, createdAt: Date, name: string, author: string, public pagesCount: number) {
    super(id, createdAt, name, author);
  }

  toString(): string {
    return `Book id=${this.id}`;
  }
}
