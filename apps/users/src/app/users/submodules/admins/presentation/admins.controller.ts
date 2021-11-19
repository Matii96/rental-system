import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserAdminEntity, UserTypes } from '@rental-system/domain';
import { IUserGetByIdMicroserviceQuery, UsersMessagesEnum } from '@rental-system/microservices';
import { RequesterUser, UserAccess } from '@rental-system/auth';
import { AdminInputDto } from './dto/input/input.dto';
import { AdminOutputDto } from './dto/output.dto';
import { AdminInputSelfDto } from './dto/input/input-self.dto';
import { IUserController } from '../../../presentation/interfaces/controller.interface';
import { AdminsRepository } from '../infrastructure/database/repositories/admins.repository';
import { AdminsService } from '../application/admins.service';
import { AdminsGuard } from '../application/guards/admins.guard';
import { UserNotSelfGuard } from '../../../application/guards/users-not-self.guard';
import { RequestUser } from '../../../presentation/decorators/request-user.decorator';

@ApiTags('Users Admins')
@Controller('v1/admins')
export class AdminsController implements IUserController<UserAdminEntity> {
  constructor(private readonly repository: AdminsRepository, private readonly adminsService: AdminsService) {}

  @Get(':userId')
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: AdminOutputDto })
  @ApiNotFoundResponse()
  getById(@Param('userId') userId: string) {
    return this.adminsService.getById(userId);
  }

  @Post()
  // @UserAccess(UserAdminEntity) TODO
  @ApiCreatedResponse({ type: AdminOutputDto })
  @ApiBadRequestResponse()
  create(@Body() data: AdminInputDto) {
    return this.adminsService.create(data);
  }

  @Put('self')
  @UserAccess(UserAdminEntity)
  @ApiOkResponse({ type: AdminOutputDto })
  @ApiBadRequestResponse()
  updateSelf(@RequesterUser() user: UserAdminEntity, @Body() data: AdminInputSelfDto) {
    return this.adminsService.updateSelf(user, data);
  }

  @Put(':userId')
  @UseGuards(AdminsGuard, UserNotSelfGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: AdminOutputDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  update(@RequestUser() user: UserAdminEntity, @Body() data: AdminInputDto) {
    return this.adminsService.update(user, data);
  }

  @Delete(':userId')
  @UseGuards(AdminsGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: AdminOutputDto })
  @ApiNotFoundResponse()
  delete(@RequestUser() user: UserAdminEntity) {
    return this.adminsService.delete(user);
  }

  @MessagePattern(<IUserGetByIdMicroserviceQuery>{ query: UsersMessagesEnum.GET_USER, type: UserTypes.USER_ADMIN })
  getUserById(id: string) {
    return this.repository.findById(id);
  }
}
