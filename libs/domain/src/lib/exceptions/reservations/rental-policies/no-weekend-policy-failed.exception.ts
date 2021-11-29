import { RentalCardEntity } from '../../../entities/reservations/rental-card.entity';

export class RentalNoWeekendPolicyFailedException extends Error {
  constructor(card: RentalCardEntity) {
    super(`Can't rent on weekend for ${card}`);
  }
}
