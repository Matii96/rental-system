import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { jwtFactory } from '@rental-system/config';
import { AuthModule } from '@rental-system/auth';
import { UserModel } from './infrastructure/database/models/user.model';
import { UsersController } from './presentation/users.controller';
import { UsersModelFactory } from './infrastructure/database/factories/users-model.factory';
import { UsersRepository } from './infrastructure/database/repositories/users.repository';
import { UsersService } from './application/users.service';
import { AdminsModule } from '../admins/admins.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: jwtFactory,
    }),
    SequelizeModule.forFeature([UserModel]),
    AuthModule,
    AdminsModule,
    CustomersModule,
  ],
  controllers: [UsersController],
  providers: [UsersModelFactory, UsersRepository, UsersService],
  exports: [UsersRepository],
})
export class UsersModule {}
