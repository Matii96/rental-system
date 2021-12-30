import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MicroservicesModule } from '@rental-system/microservices';
import { AuthModule } from '@rental-system/auth';
import { RentalCardsFactory } from './application/factories/rental-cards.factory';
import { RentalCardsService } from './application/rental-cards.service';
import { RentalCardModel } from './infrastructure/database/models/rental-card.model';
import { RentalCardsModelFactory } from './infrastructure/database/factories/rental-cards-model.factory';
import { RentalCardsRepository } from './infrastructure/database/repositories/rental-cards.repository';
import { RentalCardsController } from './presentation/rental-cards.controller';

@Module({
  imports: [SequelizeModule.forFeature([RentalCardModel]), AuthModule, MicroservicesModule],
  controllers: [RentalCardsController],
  providers: [RentalCardsModelFactory, RentalCardsFactory, RentalCardsRepository, RentalCardsService],
})
export class RentalCardsModule {}
