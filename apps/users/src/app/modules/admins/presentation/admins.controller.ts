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
import { RequesterUser, UserAccess } from '@rental-system/auth';
import { UserGetByIdQueryPattern } from '@rental-system/microservices';
import { IUserController } from '../../users/presentation/interfaces/controller.interface';
import { AdminsService } from '../application/admins.service';
import { AdminsGuard } from './guards/admins.guard';
import { UserNotSelfGuard } from '../../users/application/guards/users-not-self.guard';
import { RequestUser } from '../../users/presentation/decorators/request-user.decorator';
import { AdminInputSelfDto } from './dto/input/input-self.dto';
import { AdminInputDto } from './dto/input/input.dto';
import { AdminOutputDto } from './dto/output.dto';

@ApiTags('Users Admins')
@Controller('v1/admins')
export class AdminsController implements IUserController<UserAdminEntity> {
  constructor(private readonly adminsService: AdminsService) {}

  @Get(':userId')
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: AdminOutputDto })
  @ApiNotFoundResponse()
  async getById(@Param('userId') userId: string) {
    return new AdminOutputDto(await this.adminsService.getById(userId));
  }

  @Post()
  // @UserAccess(UserAdminEntity) TODO
  @ApiCreatedResponse({ type: AdminOutputDto })
  @ApiBadRequestResponse()
  async create(@Body() data: AdminInputDto) {
    return new AdminOutputDto(await this.adminsService.create(data));
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
    await this.adminsService.delete(user);
    return new AdminOutputDto(user);
  }

  @MessagePattern(new UserGetByIdQueryPattern(UserTypes.ADMIN))
  getEntityById(id: string) {
    return this.adminsService.getById(id);
  }
}
