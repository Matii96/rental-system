import { ItemTypes } from '@rental-system/domain';

export interface ICreateAvailabilityInput {
  id: string;
  type: ItemTypes;
}
