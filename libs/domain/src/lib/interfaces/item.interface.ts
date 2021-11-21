import { ItemEntity } from '../entities/items/item.entity';
import { ItemTypes } from '../enums/item-types.enum';

export interface IItem extends ItemEntity {
  type: ItemTypes;
}
