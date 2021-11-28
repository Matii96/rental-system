import { IRentalPolicy } from '../../interfaces/rental-policy.interface';
import { RentalNoWeekendPolicyFailedException } from '../../exceptions/reservations/rental-policies/no-weekend-policy-failed.exception';
import { LibraryCardEntity } from '../../entities/reservations/library-card.entity';

export class NoWeekendRentalPolicy implements IRentalPolicy {
  canRent(card: LibraryCardEntity) {
    const now = new Date();
    if (now.getDay() === 6 || now.getDay() === 0) {
      throw new RentalNoWeekendPolicyFailedException(card);
    }
    return true;
  }
}
