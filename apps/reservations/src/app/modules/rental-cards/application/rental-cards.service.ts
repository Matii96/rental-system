import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AggregateId } from '@rental-system/common';
import { RentalCardEntity, RentalPoliciesMapper } from '@rental-system/domain';
import { RentalCardCreateInputDto, RentalCardUpdateInputDto } from '@rental-system/dto';
import { UsersMicroserviceClient } from '@rental-system/microservices';
import { RentalCardsRepository } from '../infrastructure/database/repositories/rental-cards.repository';
import { RentalCardsFactory } from './factories/rental-cards.factory';

@Injectable()
export class RentalCardsService {
  constructor(
    private readonly config: ConfigService,
    private readonly factory: RentalCardsFactory,
    private readonly repository: RentalCardsRepository,
    private readonly usersClient: UsersMicroserviceClient
  ) {}

  getById(id: AggregateId) {
    return this.repository.findById(id);
  }

  async register(data: RentalCardCreateInputDto) {
    const card = this.factory.create(data);

    await this.usersClient.getById(card.ownerId);
    await this.repository.create(card);
    return card;
  }

  async update(card: RentalCardEntity, data: RentalCardUpdateInputDto) {
    card.rentalPolicy = new RentalPoliciesMapper[data.rentalPolicyType]({
      countLimit: this.config.get<number>('RENTAL_POLICY_COUNT_LIMIT'),
    });
    await this.repository.update(card);
    return card;
  }

  async unregister(ownerId: AggregateId) {
    const card = await this.repository.findById(ownerId);
    await this.repository.delete(card);
    return card;
  }
}
