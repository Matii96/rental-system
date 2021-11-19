import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { jwtFactory } from '@rental-system/config';
import { AuthModule } from '@rental-system/auth';
import { CustomersModule } from './submodules/customers/customers.module';
import { UserModel } from './infrastructure/database/models/user.model';
import { UsersController } from './presentation/users.controller';
import { UsersModelFactory } from './infrastructure/database/repositories/factories/users-model.factory';
import { UsersRepository } from './infrastructure/database/repositories/users.repository';
import { AdminsModule } from './submodules/admins/admins.module';
import { UsersService } from './application/users.service';

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
