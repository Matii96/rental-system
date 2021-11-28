import { BadRequestException } from '@nestjs/common';
import { RentalEntity } from '../../entities/reservations/rental.entity';

export class RentalAlreadyClosedException extends BadRequestException {
  constructor(rental: RentalEntity) {
    super(`${rental} is already closed`);
  }
}
