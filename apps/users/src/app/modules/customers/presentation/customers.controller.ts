import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserAdminEntity, UserCustomerEntity } from '@rental-system/domain';
import { RequesterUser, UserAccess } from '@rental-system/auth';
import { CustomersService } from '../application/customers.service';
import { CustomersGuard } from './guards/customers.guard';
import { UserNotSelfGuard } from '../../users/application/guards/users-not-self.guard';
import { RequestUser } from '../../users/presentation/decorators/request-user.decorator';
import { CustomerRestInputSelfDto } from './dto/rest-input/input-self.dto';
import { CustomerRestInputDto } from './dto/rest-input/input.dto';
import { CustomerRestOutputDto } from './dto/rest-output.dto';

@ApiTags('Users Customers')
@Controller('v1/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':userId')
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: CustomerRestOutputDto })
  @ApiNotFoundResponse()
  getById(@RequestUser() user: UserCustomerEntity) {
    return new CustomerRestOutputDto(user);
  }

  @Post()
  @UserAccess(UserAdminEntity)
  @ApiCreatedResponse({ type: CustomerRestOutputDto })
  @ApiBadRequestResponse()
  async create(@Body() data: CustomerRestInputDto) {
    return new CustomerRestOutputDto(await this.customersService.create(data));
  }

  @Put('self')
  @UserAccess(UserCustomerEntity)
  @ApiOkResponse({ type: CustomerRestOutputDto })
  @ApiBadRequestResponse()
  async updateSelf(@RequesterUser() user: UserCustomerEntity, @Body() data: CustomerRestInputSelfDto) {
    await this.customersService.updateSelf(user, data);
    return new CustomerRestOutputDto(user);
  }

  @Put(':userId')
  @UseGuards(CustomersGuard, UserNotSelfGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: CustomerRestOutputDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(@RequestUser() user: UserCustomerEntity, @Body() data: CustomerRestInputDto) {
    await this.customersService.update(user, data);
    return new CustomerRestOutputDto(user);
  }

  @Delete(':userId')
  @UseGuards(CustomersGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: CustomerRestOutputDto })
  @ApiNotFoundResponse()
  async delete(@RequestUser() user: UserCustomerEntity) {
    await this.customersService.delete(user);
    return new CustomerRestOutputDto(user);
  }
}
