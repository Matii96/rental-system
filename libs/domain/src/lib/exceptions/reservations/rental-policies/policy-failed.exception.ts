import { RentalCardEntity } from '../../../entities/reservations/rental-card.entity';

export class RentalPolicyFailedException extends Error {
  constructor(card: RentalCardEntity) {
    super(`Rental policy for ${card} failed`);
  }
}
