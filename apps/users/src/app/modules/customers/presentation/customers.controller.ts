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
import { UserAdminEntity, UserCustomerEntity, UserTypes } from '@rental-system/domain';
import { IUserGetByIdMicroserviceQuery, UsersMessagesEnum } from '@rental-system/microservices';
import { RequesterUser, UserAccess } from '@rental-system/auth';
import { CustomerInputDto } from './dto/input/input.dto';
import { CustomerOutputDto } from './dto/output.dto';
import { CustomerInputSelfDto } from './dto/input/input-self.dto';
import { IUserController } from '../../users/presentation/interfaces/controller.interface';
import { CustomersRepository } from '../infrastructure/database/repositories/customers.repository';
import { CustomersService } from '../application/customers.service';
import { CustomersGuard } from '../application/guards/customers.guard';
import { UserNotSelfGuard } from '../../users/application/guards/users-not-self.guard';
import { RequestUser } from '../../users/presentation/decorators/request-user.decorator';

@ApiTags('Users Customers')
@Controller('v1/customers')
export class CustomersController implements IUserController<UserCustomerEntity> {
  constructor(private readonly repository: CustomersRepository, private readonly customersService: CustomersService) {}

  @Get(':userId')
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: CustomerOutputDto })
  @ApiNotFoundResponse()
  getById(@Param('userId') userId: string) {
    return this.customersService.getById(userId);
  }

  @Post()
  @UserAccess(UserAdminEntity)
  @ApiCreatedResponse({ type: CustomerOutputDto })
  @ApiBadRequestResponse()
  create(@Body() data: CustomerInputDto) {
    return this.customersService.create(data);
  }

  @Put('self')
  @UserAccess(UserCustomerEntity)
  @ApiOkResponse({ type: CustomerOutputDto })
  @ApiBadRequestResponse()
  updateSelf(@RequesterUser() user: UserCustomerEntity, @Body() data: CustomerInputSelfDto) {
    return this.customersService.updateSelf(user, data);
  }

  @Put(':userId')
  @UseGuards(CustomersGuard, UserNotSelfGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: CustomerOutputDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  update(@RequestUser() user: UserCustomerEntity, @Body() data: CustomerInputDto) {
    return this.customersService.update(user, data);
  }

  @Delete(':userId')
  @UseGuards(CustomersGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: CustomerOutputDto })
  @ApiNotFoundResponse()
  delete(@RequestUser() user: UserCustomerEntity) {
    return this.customersService.delete(user);
  }

  @MessagePattern(<IUserGetByIdMicroserviceQuery>{ query: UsersMessagesEnum.GET_USER, type: UserTypes.USER_ADMIN })
  getUserById(id: string) {
    return this.repository.findById(id);
  }
}
