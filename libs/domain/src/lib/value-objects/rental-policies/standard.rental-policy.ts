import { IRentalPolicy } from '../../interfaces/rental-policy.interface';
import { RentalStandardPolicyFailedException } from '../../exceptions/reservations/rental-policies/standard-policy-failed.exception';
import { LibraryCardEntity } from '../../entities/reservations/library-card.entity';

export class StandardRentalPolicy implements IRentalPolicy {
  private readonly limit = 5;

  canRent(card: LibraryCardEntity) {
    if (card.activeRentals.length >= this.limit) {
      throw new RentalStandardPolicyFailedException(card);
    }
    return true;
  }
}
