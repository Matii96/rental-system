import { Injectable } from '@nestjs/common';
import { AggregateId } from '@rental-system/common';
import { AvailabilityEntity } from '@rental-system/domain';
import { IAvailabilityTotalInput, IChangeStateAvailabilityInput } from '@rental-system/dto-interfaces';
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

  async register(data: IChangeStateAvailabilityInput) {
    const availability = this.factory.create(data);
    await this.repository.create(availability);
    return availability;
  }

  async unregister(data: IChangeStateAvailabilityInput) {
    const availability = await this.repository.findById(new AggregateId(data.id));
    await this.repository.delete(availability);
    return availability;
  }
}
