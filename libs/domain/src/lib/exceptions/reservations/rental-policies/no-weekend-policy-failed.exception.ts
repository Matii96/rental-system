import { DomainException } from '@rental-system/common';
import { RentalCardEntity } from '../../../entities/reservations/rental-card.entity';

export class RentalNoWeekendPolicyFailedException extends DomainException {
  constructor(card: RentalCardEntity) {
    super(`Can't rent on weekend for ${card}`);
  }
}
