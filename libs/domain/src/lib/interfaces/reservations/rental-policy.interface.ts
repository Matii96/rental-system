import { RentalCardEntity } from '../../entities/reservations/rental-card.entity';
import { RentalEntity } from '../../entities/reservations/rental.entity';
import { IRentalPolicyConfig } from './rental-policy-config.interface';

export interface IRentalPolicy {
  config: IRentalPolicyConfig;
  canRent(card: RentalCardEntity, newRental: RentalEntity): boolean;
}
