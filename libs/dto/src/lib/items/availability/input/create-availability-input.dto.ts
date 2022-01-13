import { ItemTypes } from '@rental-system/domain';

export class AvailabilityCreateInputDto {
  readonly id: string;
  readonly type: ItemTypes;
}
