import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AvailabilityService } from './application/availability.service';
import { AvailabilityModelFactory } from './infrastructure/database/factories/availability-model.factory';
import { AvailabilityModel } from './infrastructure/database/models/availability.model';
import { AvailabilityRepository } from './infrastructure/database/repositories/availability.repository';
import { AvailabilityController } from './presentation/availability.controller';

@Module({
  imports: [SequelizeModule.forFeature([AvailabilityModel])],
  controllers: [AvailabilityController],
  providers: [AvailabilityModelFactory, AvailabilityRepository, AvailabilityService],
})
export class AvailabilityModule {}
