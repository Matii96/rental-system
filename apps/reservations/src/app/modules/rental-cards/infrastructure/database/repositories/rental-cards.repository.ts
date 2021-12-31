import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { AggregateId } from '@rental-system/common';
import { InvalidIdException, SequelizeGenericRepository } from '@rental-system/database-storage';
import { RentalCardEntity } from '@rental-system/domain';
import { RentalCardsModelFactory } from '../factories/rental-cards-model.factory';
import { RentalCardModel } from '../models/rental-card.model';
import { RentalsRepository } from '../../../../rentals/infrastructure/database/repositories/rentals.repository';

@Injectable()
export class RentalCardsRepository extends SequelizeGenericRepository<RentalCardEntity, RentalCardModel> {
  constructor(
    sequelize: Sequelize,
    @InjectModel(RentalCardModel) model: typeof RentalCardModel,
    modelFactory: RentalCardsModelFactory,
    private readonly rentalsRepository: RentalsRepository
  ) {
    super(sequelize, model, modelFactory);
  }

  async findById(id: AggregateId, transaction?: Transaction): Promise<RentalCardEntity> {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    if (!regexExp.test(id.toString())) {
      throw new InvalidIdException();
    }

    const data = await this.model.findByPk(id.toString(), { transaction });
    if (!data) throw new NotFoundException();
    return this.modelFactory.modelToEntity(
      <RentalCardModel>data,
      await this.rentalsRepository.findAllActive(new AggregateId(data.id), transaction)
    );
  }
}
