import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../users/users.module';
import { AdminsService } from './application/admins.service';
import { AdminsFactory } from './application/factories/admins.factory';
import { UserAdminModel } from './infrastructure/database/models/admin.model';
import { AdminsRepository } from './infrastructure/database/repositories/admins.repository';
import { AdminsModelFactory } from './infrastructure/database/repositories/factories/admins-model.factory';
import { AdminsController } from './presentation/admins.controller';

@Module({
  imports: [SequelizeModule.forFeature([UserAdminModel]), forwardRef(() => UsersModule)],
  controllers: [AdminsController],
  providers: [AdminsFactory, AdminsModelFactory, AdminsRepository, AdminsService],
  exports: [AdminsModelFactory],
})
export class AdminsModule {}
