import { Injectable } from '@nestjs/common';
import { IItemAvailability } from '@rental-system/dto-interfaces';
import { AvailabilityRepository } from '../infrastructure/database/repositories/availability.repository';
import { AvailabilityFactory } from './factories/availability.factory';

@Injectable()
export class AvailabilityService {
  constructor(private readonly factory: AvailabilityFactory, private readonly repository: AvailabilityRepository) {}

  async register(data: IItemAvailability) {
    const availability = this.factory.create(data);
    await this.repository.create(availability);
    return availability;
  }

  async unregister(data: IItemAvailability) {
    const availability = await this.repository.findById(data.id);
    await this.repository.delete(availability);
    return availability;
  }
}
