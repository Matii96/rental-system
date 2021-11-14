import { Body, Controller, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserAdminEntity, UserTypes } from '@rental-system/domain';
import { IUserGetByIdMicroserviceQuery, UsersMessagesEnum } from '@rental-system/microservices';
import { IUserController } from '../interfaces/controller.interface';
import { AdminsService } from './admins.service';
import { AdminsRepository } from './repositories/admins.repository';
import { AdminInputDto } from './dto/input.dto';
import { AdminOutputDto } from './dto/output.dto';

@ApiTags('Users Admins')
@Controller('v1/admins')
export class AdminsController implements IUserController<UserAdminEntity> {
  constructor(private readonly repository: AdminsRepository, private readonly adminsService: AdminsService) {}

  @Post()
  @ApiCreatedResponse({ type: AdminOutputDto })
  async create(@Body() data: AdminInputDto) {
    return this.adminsService.create(data);
  }

  @MessagePattern(<IUserGetByIdMicroserviceQuery>{ query: UsersMessagesEnum.GET_USER, type: UserTypes.USER_ADMIN })
  async getUserById(id: string) {
    return this.repository.findById(id);
  }
}
