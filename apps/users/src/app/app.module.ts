import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommonConfig, sequelizeFactory } from '@rental-system/config';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/users/.env'],
      validate: CommonConfig.validate,
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
