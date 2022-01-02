import { DomainException } from '@rental-system/common';
import { RentalCardEntity } from '../../../entities/reservations/rental-card.entity';

export class RentalCountLimitPolicyFailedException extends DomainException {
  constructor(card: RentalCardEntity) {
    super(`Can't rent more than 5 items for ${card}`);
  }
}
