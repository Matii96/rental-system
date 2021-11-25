import { Injectable } from '@nestjs/common';
import { IItem } from '@rental-system/domain';
import { AvailabilityRepository } from '../infrastructure/database/repositories/availability.repository';
import { AvailabilityFactory } from './factories/availability.factory';

@Injectable()
export class AvailabilityService {
  constructor(private readonly factory: AvailabilityFactory, private readonly repository: AvailabilityRepository) {}

  async register(item: IItem) {
    const availability = this.factory.create(item);
    await this.repository.create(availability);
    return item;
  }

  async unregister(item: IItem) {
    const availability = await this.repository.findById(item.id);
    await this.repository.delete(availability);
    return availability;
  }
}
