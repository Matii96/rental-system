import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommonConfig, sequelizeFactory } from '@rental-system/config';
import { AvailabilityModule } from './modules/availability/availability.module';
import { AppController } from './presentation/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/availability/.env'],
      validate: CommonConfig.validate,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: sequelizeFactory,
    }),
    AvailabilityModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
