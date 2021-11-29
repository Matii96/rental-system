import { RentalCardEntity } from '../../../entities/reservations/rental-card.entity';

export class RentalCountLimitPolicyFailedException extends Error {
  constructor(card: RentalCardEntity) {
    super(`Can't rent more than 5 items for ${card}`);
  }
}
