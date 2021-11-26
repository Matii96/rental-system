import { AggregateId } from '@rental-system/common';
import { ItemTypes } from '@rental-system/domain';

export interface IItemAvailability {
  id: AggregateId;
  type: ItemTypes;
}
