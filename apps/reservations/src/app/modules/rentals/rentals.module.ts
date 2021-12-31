import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RentalsModelFactory } from './infrastructure/database/factories/rentals-model.factory';
import { RentalModel } from './infrastructure/database/models/rental.model';
import { RentalsRepository } from './infrastructure/database/repositories/rentals.repository';

@Module({
  imports: [SequelizeModule.forFeature([RentalModel])],
  providers: [RentalsModelFactory, RentalsRepository],
  exports: [RentalsRepository],
})
export class RentalsModule {}
