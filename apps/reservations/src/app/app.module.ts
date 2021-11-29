import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeFactory } from '@rental-system/config';
import { ReservationsConfig } from './infrastructure/config/config.validator';
import { RentalCardsModule } from './modules/rental-cards/rental-cards.module';
import { AppController } from './presentation/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/reservations/.env'],
      validate: ReservationsConfig.validate,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: sequelizeFactory,
    }),
    RentalCardsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
