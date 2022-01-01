import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Transaction, Op } from 'sequelize';
import { AggregateId, FindAllSearchOptions } from '@rental-system/common';
import { RentalEntity } from '@rental-system/domain';
import { SequelizeGenericRepository } from '@rental-system/database-storage';
import { RentalsModelFactory } from '../factories/rentals-model.factory';
import { RentalModel } from '../models/rental.model';

@Injectable()
export class RentalsRepository extends SequelizeGenericRepository<RentalEntity, RentalModel> {
  constructor(
    sequelize: Sequelize,
    @InjectModel(RentalModel) model: typeof RentalModel,
    modelFactory: RentalsModelFactory
  ) {
    super(sequelize, model, modelFactory);
  }

  async findAllForCard(cardId: AggregateId, options: FindAllSearchOptions = {}) {
    const search = { [Op.like]: `%${options.search || ''}%` };
    const query: Record<string, unknown>[] = [{ itemId: search }, { returnDate: search }];

    const rentals = await this.model.findAll({
      where: { cardId: cardId.toString(), [Op.or]: query },
      ...this.applyOptions(options),
    });
    return rentals.map((rental) => this.modelFactory.modelToEntity(<RentalModel>rental));
  }

  async findAllActive(cardId: AggregateId, transaction?: Transaction) {
    const rentals = await this.model.findAll({
      where: { cardId: cardId.toString(), returnDate: { [Op.ne]: null } },
      transaction,
    });
    return rentals.map((rental) => this.modelFactory.modelToEntity(<RentalModel>rental));
  }

  async countForCard(cardId: AggregateId, transaction?: Transaction): Promise<number> {
    return this.model.count({ where: { cardId: cardId.toString() }, transaction });
  }
}
