import { LibraryCardEntity } from '../../entities/reservations/library-card.entity';
import { RentalEntity } from '../../entities/reservations/rental.entity';

export class RentalNotActiveException extends Error {
  constructor(card: LibraryCardEntity, rental: RentalEntity) {
    super(`${rental} is not an active rental of ${card}`);
  }
}
