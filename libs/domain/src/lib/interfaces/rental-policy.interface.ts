import { LibraryCardEntity } from '../entities/reservations/library-card.entity';
import { RentalEntity } from '../entities/reservations/rental.entity';

export interface IRentalPolicy {
  canRent(card: LibraryCardEntity, newRental: RentalEntity): boolean;
}
