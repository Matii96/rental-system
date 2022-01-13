import { AvailabilityEntity } from '@rental-system/domain';

export class AvailabilityOutputDto {
  readonly total: number;
  readonly reserved: number;

  constructor(availability: AvailabilityEntity) {
    this.total = availability.getTotal();
    this.reserved = availability.getReserved();
  }
}
