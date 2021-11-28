import { IRentalPolicy } from '../../interfaces/rental-policy.interface';

export class OpenRentalPolicy implements IRentalPolicy {
  canRent() {
    return true;
  }
}
