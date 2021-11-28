import { AggregateId } from '@rental-system/common';
import { RentalEntity } from '../entities/reservations/rental.entity';

export interface IRentalPolicy {
  canRent(activeRentals: AggregateId[], newRental: RentalEntity): boolean;
}
