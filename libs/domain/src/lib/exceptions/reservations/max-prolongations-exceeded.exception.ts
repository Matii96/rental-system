import { BadRequestException } from '@nestjs/common';
import { RentalEntity } from '../../entities/reservations/rental.entity';

export class MaxProlongationsExceededException extends BadRequestException {
  constructor(rental: RentalEntity) {
    super(`Max prolongations for ${rental} exceeded`);
  }
}
