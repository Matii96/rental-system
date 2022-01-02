import { DomainException } from '@rental-system/common';
import { RentalCardEntity } from '../../../entities/reservations/rental-card.entity';

export class RentalPolicyFailedException extends DomainException {
  constructor(card: RentalCardEntity) {
    super(`Rental policy for ${card} failed`);
  }
}
