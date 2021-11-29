import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RentalCardModel } from './infrastructure/database/models/rental-card.model';

@Module({
  imports: [SequelizeModule.forFeature([RentalCardModel])],
})
export class RentalCardsModule {}
