import { IRentalPolicy } from '../../interfaces/reservations/rental-policy.interface';
import { IRentalPolicyConfig } from '../../interfaces/reservations/rental-policy-config.interface';

export class OpenRentalPolicy implements IRentalPolicy {
  constructor(readonly config: IRentalPolicyConfig) {}

  canRent() {
    return true;
  }
}
