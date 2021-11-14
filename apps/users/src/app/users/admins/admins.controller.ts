import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserAdminEntity, UserTypes } from '@rental-system/domain';
import { IUserGetByIdMicroserviceQuery, UsersMessagesEnum } from '@rental-system/microservices';
import { UserAccess } from '@rental-system/auth';
import { IUserController } from '../interfaces/controller.interface';
import { AdminsService } from './admins.service';
import { AdminsRepository } from './repositories/admins.repository';
import { RequestAdmin } from './decorators/request-admin.decorator';
import { AdminsGuard } from './guards/admins.guard';
import { AdminInputDto } from './dto/input.dto';
import { AdminOutputDto } from './dto/output.dto';

@ApiTags('Users Admins')
@Controller('v1/admins')
export class AdminsController implements IUserController<UserAdminEntity> {
  constructor(private readonly repository: AdminsRepository, private readonly adminsService: AdminsService) {}

  @Post()
  @ApiCreatedResponse({ type: AdminOutputDto })
  @ApiBadRequestResponse()
  create(@Body() data: AdminInputDto) {
    return this.adminsService.create(data);
  }

  @Put(':userId')
  @UseGuards(AdminsGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: AdminOutputDto })
  update(@RequestAdmin() user: UserAdminEntity, @Body() data: AdminInputDto) {
    return this.adminsService.update(user, data);
  }

  @Delete(':userId')
  @UseGuards(AdminsGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: AdminOutputDto })
  delete(@RequestAdmin() user: UserAdminEntity) {
    return this.adminsService.delete(user);
  }

  @MessagePattern(<IUserGetByIdMicroserviceQuery>{ query: UsersMessagesEnum.GET_USER, type: UserTypes.USER_ADMIN })
  getUserById(id: string) {
    return this.repository.findById(id);
  }
}
