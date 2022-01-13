import { Injectable } from '@nestjs/common';
import { FindAllSearchOptions, ICountableData } from '@rental-system/common';
import { RentalCardEntity, RentalEntity } from '@rental-system/domain';
import { ProlongRentalInputDto, RentalCreateInputDto } from '@rental-system/dto';
import { RentalsRepository } from '../infrastructure/database/repositories/rentals.repository';
import { RentalsFactory } from './factories/rentals.factory';

@Injectable()
export class RentalsService {
  constructor(private readonly factory: RentalsFactory, private readonly repository: RentalsRepository) {}

  async getAll(card: RentalCardEntity, options: FindAllSearchOptions): Promise<ICountableData<RentalEntity>> {
    const [data, total] = await Promise.all([
      this.repository.findAllForCard(card.id, options),
      this.repository.countForCard(card.id),
    ]);
    return { data, total };
  }

  async create(card: RentalCardEntity, data: RentalCreateInputDto) {
    const rental = this.factory.create(card, data);
    card.registerRental(rental);
    await this.repository.create(rental);
    return rental;
  }

  async prolong(rental: RentalEntity, data: ProlongRentalInputDto) {
    rental.prolong(data.to);
    await this.repository.update(rental);
    return rental;
  }

  async close(rental: RentalEntity) {
    rental.close();
    await this.repository.update(rental);
    return rental;
  }
}
