import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '@rental-system/auth';
import { AvailabilityService } from './application/availability.service';
import { AvailabilityFactory } from './application/factories/availability.factory';
import { AvailabilityModelFactory } from './infrastructure/database/factories/availability-model.factory';
import { AvailabilityModel } from './infrastructure/database/models/availability.model';
import { AvailabilityRepository } from './infrastructure/database/repositories/availability.repository';
import { AvailabilityController } from './presentation/availability.controller';

@Module({
  imports: [SequelizeModule.forFeature([AvailabilityModel]), AuthModule],
  controllers: [AvailabilityController],
  providers: [AvailabilityFactory, AvailabilityModelFactory, AvailabilityRepository, AvailabilityService],
})
export class AvailabilityModule {}
