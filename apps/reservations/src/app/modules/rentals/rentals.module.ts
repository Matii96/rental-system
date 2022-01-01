import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RentalsFactory } from './application/factories/rentals.factory';
import { RentalsService } from './application/rentals.service';
import { RentalsModelFactory } from './infrastructure/database/factories/rentals-model.factory';
import { RentalModel } from './infrastructure/database/models/rental.model';
import { RentalsRepository } from './infrastructure/database/repositories/rentals.repository';

@Module({
  imports: [SequelizeModule.forFeature([RentalModel])],
  providers: [RentalsModelFactory, RentalsRepository, RentalsFactory, RentalsService],
  exports: [RentalsRepository],
})
export class RentalsModule {}
