import { BadRequestException } from '@nestjs/common';
import { RentalEntity } from '../../entities/reservations/rental.entity';

export class OverdueRentalException extends BadRequestException {
  constructor(rental: RentalEntity) {
    super(`Overdue ${rental} can't be prolonged`);
  }
}
