import { ItemTypes } from '@rental-system/domain';

export interface IChangeStateAvailabilityInput {
  id: string;
  type: ItemTypes;
}
