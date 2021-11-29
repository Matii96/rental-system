import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeGenericRepository } from '@rental-system/database-storage';
import { RentalCardEntity } from '@rental-system/domain';
import { RentalCardsModelFactory } from '../factories/rental-cards-model.factory';
import { RentalCardModel } from '../models/rental-card.model';

@Injectable()
export class RentalCardsRepository extends SequelizeGenericRepository<RentalCardEntity, RentalCardModel> {
  constructor(
    sequelize: Sequelize,
    @InjectModel(RentalCardModel) model: typeof RentalCardModel,
    modelFactory: RentalCardsModelFactory
  ) {
    super(sequelize, model, modelFactory);
  }
}
