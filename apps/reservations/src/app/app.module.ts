import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommonConfig, sequelizeFactory } from '@rental-system/config';
import { ReservationsModule } from './modules/reservations/availability.module';
import { AppController } from './presentation/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/reservations/.env'],
      validate: CommonConfig.validate,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: sequelizeFactory,
    }),
    ReservationsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
