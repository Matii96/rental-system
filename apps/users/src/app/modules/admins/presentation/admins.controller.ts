import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserAdminEntity } from '@rental-system/domain';
import { RequesterUser, UserAccess } from '@rental-system/auth';
import { AdminsService } from '../application/admins.service';
import { AdminsGuard } from './guards/admins.guard';
import { UserNotSelfGuard } from '../../users/application/guards/users-not-self.guard';
import { RequestUser } from '../../users/presentation/decorators/request-user.decorator';
import { AdminRestInputSelfDto } from './dto/rest-input/input-self.dto';
import { AdminRestInputDto } from './dto/rest-input/input.dto';
import { AdminRestOutputDto } from './dto/rest-output.dto';

@ApiTags('Users Admins')
@Controller('v1/admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get(':userId')
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: AdminRestOutputDto })
  @ApiNotFoundResponse()
  getById(@RequestUser() user: UserAdminEntity) {
    return new AdminRestOutputDto(user);
  }

  @Post()
  @UserAccess(UserAdminEntity)
  @ApiCreatedResponse({ type: AdminRestOutputDto })
  @ApiBadRequestResponse()
  async create(@Body() data: AdminRestInputDto) {
    return new AdminRestOutputDto(await this.adminsService.create(data));
  }

  @Put('self')
  @UserAccess(UserAdminEntity)
  @ApiOkResponse({ type: AdminRestOutputDto })
  @ApiBadRequestResponse()
  async updateSelf(@RequesterUser() user: UserAdminEntity, @Body() data: AdminRestInputSelfDto) {
    await this.adminsService.updateSelf(user, data);
    return new AdminRestOutputDto(user);
  }

  @Put(':userId')
  @UseGuards(AdminsGuard, UserNotSelfGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: AdminRestOutputDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(@RequestUser() user: UserAdminEntity, @Body() data: AdminRestInputDto) {
    await this.adminsService.update(user, data);
    return new AdminRestOutputDto(user);
  }

  @Delete(':userId')
  @UseGuards(AdminsGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: AdminRestOutputDto })
  @ApiNotFoundResponse()
  async delete(@RequestUser() user: UserAdminEntity) {
    await this.adminsService.delete(user);
    return new AdminRestOutputDto(user);
  }
}
