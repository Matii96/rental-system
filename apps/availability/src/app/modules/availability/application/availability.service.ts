import { Injectable } from '@nestjs/common';
import { AggregateId } from '@rental-system/common';
import { AvailabilityEntity } from '@rental-system/domain';
import { AvailabilityTotalInputDto, AvailabilityCreateInputDto } from '@rental-system/dto';
import { AvailabilityRepository } from '../infrastructure/database/repositories/availability.repository';
import { AvailabilityFactory } from './factories/availability.factory';

@Injectable()
export class AvailabilityService {
  constructor(private readonly factory: AvailabilityFactory, private readonly repository: AvailabilityRepository) {}

  async reserveItem(itemId: AggregateId) {
    const availability = await this.repository.findById(itemId);
    availability.reserveItem();
    await this.repository.update(availability);
    return availability;
  }

  async releaseItem(itemId: AggregateId) {
    const availability = await this.repository.findById(itemId);
    availability.releaseItem();
    await this.repository.update(availability);
    return availability;
  }

  async updateTotal(availability: AvailabilityEntity, data: AvailabilityTotalInputDto) {
    availability.setTotal(data.total);
    await this.repository.update(availability);
    return availability;
  }

  async register(data: AvailabilityCreateInputDto) {
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
