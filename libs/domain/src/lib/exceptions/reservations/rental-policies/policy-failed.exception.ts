import { LibraryCardEntity } from '../../../entities/reservations/library-card.entity';

export class RentalPolicyFailedException extends Error {
  constructor(card: LibraryCardEntity) {
    super(`Rental policy for ${card} failed`);
  }
}
