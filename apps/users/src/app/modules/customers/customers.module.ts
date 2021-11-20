import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../users/users.module';
import { CustomersService } from './application/customers.service';
import { CustomersFactory } from './application/factories/customers.factory';
import { UserCustomerModel } from './infrastructure/database/models/user-customer.model';
import { CustomersRepository } from './infrastructure/database/repositories/customers.repository';
import { CustomersModelFactory } from './infrastructure/database/factories/customers-model.factory';
import { CustomersController } from './presentation/customers.controller';

@Module({
  imports: [SequelizeModule.forFeature([UserCustomerModel]), forwardRef(() => UsersModule)],
  controllers: [CustomersController],
  providers: [CustomersFactory, CustomersModelFactory, CustomersRepository, CustomersService],
  exports: [CustomersModelFactory],
})
export class CustomersModule {}
