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
import { CustomerInputSelfDto } from './dto/input/input-self.dto';
import { CustomerInputDto } from './dto/input/input.dto';
import { CustomerOutputDto } from './dto/output.dto';

@ApiTags('Users Customers')
@Controller('v1/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':userId')
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: CustomerOutputDto })
  @ApiNotFoundResponse()
  getById(@RequestUser() user: UserCustomerEntity) {
    return new CustomerOutputDto(user);
  }

  @Post()
  @UserAccess(UserAdminEntity)
  @ApiCreatedResponse({ type: CustomerOutputDto })
  @ApiBadRequestResponse()
  async create(@Body() data: CustomerInputDto) {
    return new CustomerOutputDto(await this.customersService.create(data));
  }

  @Put('self')
  @UserAccess(UserCustomerEntity)
  @ApiOkResponse({ type: CustomerOutputDto })
  @ApiBadRequestResponse()
  async updateSelf(@RequesterUser() user: UserCustomerEntity, @Body() data: CustomerInputSelfDto) {
    await this.customersService.updateSelf(user, data);
    return new CustomerOutputDto(user);
  }

  @Put(':userId')
  @UseGuards(CustomersGuard, UserNotSelfGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: CustomerOutputDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(@RequestUser() user: UserCustomerEntity, @Body() data: CustomerInputDto) {
    await this.customersService.update(user, data);
    return new CustomerOutputDto(user);
  }

  @Delete(':userId')
  @UseGuards(CustomersGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: CustomerOutputDto })
  @ApiNotFoundResponse()
  async delete(@RequestUser() user: UserCustomerEntity) {
    await this.customersService.delete(user);
    return new CustomerOutputDto(user);
  }
}
