import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserAdminModel } from './models/admin.model';
import { AdminsModelFactory } from './repositories/factories/admins-model.factory';
import { AdminsRepository } from './repositories/admins.repository';
import { UsersModule } from '../users.module';
import { AdminsFactory } from './factories/admins.factory';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';

@Module({
  imports: [SequelizeModule.forFeature([UserAdminModel]), forwardRef(() => UsersModule)],
  controllers: [AdminsController],
  providers: [AdminsFactory, AdminsModelFactory, AdminsRepository, AdminsService],
  exports: [AdminsModelFactory],
})
export class AdminsModule {}
