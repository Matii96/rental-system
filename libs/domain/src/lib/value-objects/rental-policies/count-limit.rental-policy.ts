import { IRentalPolicy } from '../../interfaces/reservations/rental-policy.interface';
import { RentalCountLimitPolicyFailedException } from '../../exceptions/reservations/rental-policies/count-limit-policy-failed.exception';
import { IRentalPolicyConfig } from '../../interfaces/reservations/rental-policy-config.interface';
import { RentalCardEntity } from '../../entities/reservations/rental-card.entity';

export class CountLimitRentalPolicy implements IRentalPolicy {
  constructor(readonly config: IRentalPolicyConfig) {}

  canRent(card: RentalCardEntity) {
    if (card.activeRentals.length >= this.config.countLimit) {
      throw new RentalCountLimitPolicyFailedException(card);
    }
    return true;
  }
}
