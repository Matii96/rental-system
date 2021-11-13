import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { jwtFactory } from '@rental-system/config';
import { AdminsModule } from './admins/admins.module';
import { CustomersModule } from './customers/customers.module';
import { UserModel } from './models/user.model';
import { UsersModelFactory } from './repositories/factories/users-model.factory';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: jwtFactory,
    }),
    SequelizeModule.forFeature([UserModel]),
    AdminsModule,
    CustomersModule,
  ],
  controllers: [UsersController],
  providers: [UsersModelFactory, UsersRepository, UsersService],
  exports: [UsersRepository],
})
export class UsersModule {}
