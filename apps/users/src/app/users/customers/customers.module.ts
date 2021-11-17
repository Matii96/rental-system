import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../users.module';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomersFactory } from './factories/customers.factory';
import { UserCustomerModel } from './models/user-customer.model';
import { CustomersRepository } from './repositories/customers.repository';
import { CustomersModelFactory } from './repositories/factories/customers-model.factory';

@Module({
  imports: [SequelizeModule.forFeature([UserCustomerModel]), forwardRef(() => UsersModule)],
  controllers: [CustomersController],
  providers: [CustomersFactory, CustomersModelFactory, CustomersRepository, CustomersService],
  exports: [CustomersModelFactory],
})
export class CustomersModule {}
