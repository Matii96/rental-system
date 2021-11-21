import { IItem } from '../../interfaces/item.interface';
import { ItemTypes } from '../../enums/item-types.enum';
import { ItemEntity } from './item.entity';

export class MovieEntity extends ItemEntity implements IItem {
  readonly type = ItemTypes.MOVIE;

  constructor(id: string, createdAt: Date, name: string, author: string, public length: number) {
    super(id, createdAt, name, author);
  }

  toString(): string {
    return `Movie id=${this.id}`;
  }
}
