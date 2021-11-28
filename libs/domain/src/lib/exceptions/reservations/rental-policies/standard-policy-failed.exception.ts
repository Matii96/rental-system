import { LibraryCardEntity } from '../../../entities/reservations/library-card.entity';

export class RentalStandardPolicyFailedException extends Error {
  constructor(card: LibraryCardEntity) {
    super(`Can't rent more than 5 items for ${card}`);
  }
}
