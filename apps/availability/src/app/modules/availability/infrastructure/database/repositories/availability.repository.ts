import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AvailabilityEntity } from '@rental-system/domain';
import { SequelizeGenericRepository } from '@rental-system/database-storage';
import { AvailabilityModel } from '../models/availability.model';
import { AvailabilityModelFactory } from '../factories/availability-model.factory';

@Injectable()
export class AvailabilityRepository extends SequelizeGenericRepository<AvailabilityEntity, AvailabilityModel> {
  constructor(
    sequelize: Sequelize,
    @InjectModel(AvailabilityModel) model: typeof AvailabilityModel,
    modelFactory: AvailabilityModelFactory
  ) {
    super(sequelize, model, modelFactory);
  }

  // findAll(options: FindAllSearchOptions = {}) {
  //   const search = { [Op.like]: `%${options.search || ''}%` };
  //   const query: Record<string, unknown>[] = [{ name: search }, { author: search }];
  //   if (parseInt(options.search)) {
  //     query.push({ pagesCount: parseInt(options.search) });
  //   }
  //   return super.findAll(options, { [Op.or]: query });
  // }
}
