import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AvailabilityService } from './application/availability.service';
import { ItemAvailabilityModel } from './infrastructure/database/models/item-availability.model';
import { AvailabilityController } from './presentation/availability.controller';

@Module({
  imports: [SequelizeModule.forFeature([ItemAvailabilityModel])],
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
})
export class AvailabilityModule {}
