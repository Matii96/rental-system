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
import { IUserController } from '../../users/presentation/interfaces/controller.interface';
import { AdminsRepository } from '../infrastructure/database/repositories/admins.repository';
import { AdminsService } from '../application/admins.service';
import { AdminsGuard } from '../application/guards/admins.guard';
import { UserNotSelfGuard } from '../../users/application/guards/users-not-self.guard';
import { RequestUser } from '../../users/presentation/decorators/request-user.decorator';
import { AdminInputSelfDto } from './dto/input/input-self.dto';
import { AdminInputDto } from './dto/input/input.dto';
import { AdminOutputDto } from './dto/output.dto';

@ApiTags('Users Admins')
@Controller('v1/admins')
export class AdminsController implements IUserController<UserAdminEntity> {
  constructor(private readonly repository: AdminsRepository, private readonly adminsService: AdminsService) {}

  @Get(':userId')
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: AdminOutputDto })
  @ApiNotFoundResponse()
  async getById(@Param('userId') userId: string) {
    const user = await this.repository.findById(userId);
    return new AdminOutputDto(user);
  }

  @Post()
  // @UserAccess(UserAdminEntity) TODO
  @ApiCreatedResponse({ type: AdminOutputDto })
  @ApiBadRequestResponse()
  async create(@Body() data: AdminInputDto) {
    const user = await this.adminsService.create(data);
    return new AdminOutputDto(user);
  }

  @Put('self')
  @UserAccess(UserAdminEntity)
  @ApiOkResponse({ type: AdminOutputDto })
  @ApiBadRequestResponse()
  async updateSelf(@RequesterUser() user: UserAdminEntity, @Body() data: AdminInputSelfDto) {
    await this.adminsService.updateSelf(user, data);
    return new AdminOutputDto(user);
  }

  @Put(':userId')
  @UseGuards(AdminsGuard, UserNotSelfGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: AdminOutputDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(@RequestUser() user: UserAdminEntity, @Body() data: AdminInputDto) {
    await this.adminsService.update(user, data);
    return new AdminOutputDto(user);
  }

  @Delete(':userId')
  @UseGuards(AdminsGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: AdminOutputDto })
  @ApiNotFoundResponse()
  async delete(@RequestUser() user: UserAdminEntity) {
    await this.repository.delete(user);
    return new AdminOutputDto(user);
  }

  @MessagePattern(<IUserGetByIdMicroserviceQuery>{ query: UsersMessagesEnum.GET_USER, type: UserTypes.USER_ADMIN })
  getEntityById(id: string) {
    return this.repository.findById(id);
  }
}
