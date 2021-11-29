import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RentalModel } from './infrastructure/database/models/rental.model';

@Module({
  imports: [SequelizeModule.forFeature([RentalModel])],
})
export class RentalsModule {}
