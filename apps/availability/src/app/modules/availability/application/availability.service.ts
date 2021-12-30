import { Injectable } from '@nestjs/common';
import { AggregateId } from '@rental-system/common';
import { AvailabilityEntity } from '@rental-system/domain';
import { IAvailabilityTotalInput, ICreateAvailabilityInput } from '@rental-system/interfaces';
import { AvailabilityRepository } from '../infrastructure/database/repositories/availability.repository';
import { AvailabilityFactory } from './factories/availability.factory';

@Injectable()
export class AvailabilityService {
  constructor(private readonly factory: AvailabilityFactory, private readonly repository: AvailabilityRepository) {}

  async updateTotal(availability: AvailabilityEntity, data: IAvailabilityTotalInput) {
    availability.setTotal(data.total);
    await this.repository.update(availability);
    return availability;
  }

  async register(data: ICreateAvailabilityInput) {
    const availability = this.factory.create(data);
    await this.repository.create(availability);
    return availability;
  }

  async unregister(itemId: AggregateId) {
    const availability = await this.repository.findById(itemId);
    await this.repository.delete(availability);
    return availability;
  }
}
