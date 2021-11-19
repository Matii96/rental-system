import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeFactory } from '@rental-system/config';
import { AppController } from './presentation/app.controller';
import { UsersConfig } from './infrastructure/config/config.validator';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/users/.env'],
      validate: UsersConfig.validate,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: sequelizeFactory,
    }),
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
