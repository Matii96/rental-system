import { IRentalPolicy } from '../../interfaces/reservations/rental-policy.interface';
import { RentalNoWeekendPolicyFailedException } from '../../exceptions/reservations/rental-policies/no-weekend-policy-failed.exception';
import { IRentalPolicyConfig } from '../../interfaces/reservations/rental-policy-config.interface';
import { RentalCardEntity } from '../../entities/reservations/rental-card.entity';

export class NoWeekendRentalPolicy implements IRentalPolicy {
  constructor(readonly config: IRentalPolicyConfig) {}

  canRent(card: RentalCardEntity) {
    const now = new Date();
    if (now.getDay() === 6 || now.getDay() === 0) {
      throw new RentalNoWeekendPolicyFailedException(card);
    }
    return true;
  }
}
