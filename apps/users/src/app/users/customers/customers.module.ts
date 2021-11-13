import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../users.module';
import { CustomersFactory } from './factories/customers.factory';
import { UserCustomerModel } from './models/user-customer.model';
import { CustomersRepository } from './repositories/customers.repository';
import { CustomersModelFactory } from './repositories/factories/customers-model.factory';

@Module({
  imports: [SequelizeModule.forFeature([UserCustomerModel]), forwardRef(() => UsersModule)],
  providers: [CustomersFactory, CustomersModelFactory, CustomersRepository],
  exports: [CustomersModelFactory],
})
export class CustomersModule {}
