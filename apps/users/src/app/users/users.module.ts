import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserAdminModel } from './models/user-admin.model';
import { UserCustomerModel } from './models/user-customer.model';
import { UserModel } from './models/user.model';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([UserModel, UserAdminModel, UserCustomerModel])],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
})
export class UsersModule {}
