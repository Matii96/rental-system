import { Injectable } from '@nestjs/common';
import { FindAllSearchOptions, ICountableData } from '@rental-system/common';
import { RentalCardEntity, RentalEntity } from '@rental-system/domain';
import { ICreateRentalInput, IProlongRentalInput } from '@rental-system/interfaces';
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

  async create(card: RentalCardEntity, data: ICreateRentalInput) {
    const rental = this.factory.create(data);
    card.registerRental(rental);
    await this.repository.create(rental);
    return rental;
  }

  async prolong(rental: RentalEntity, data: IProlongRentalInput) {
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
