import { LibraryCardEntity } from '../../../entities/reservations/library-card.entity';

export class RentalNoWeekendPolicyFailedException extends Error {
  constructor(card: LibraryCardEntity) {
    super(`Can't rent on weekend for ${card}`);
  }
}
