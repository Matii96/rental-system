import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserAccess } from '@rental-system/auth';
import { AvailabilityEntity, UserAdminEntity } from '@rental-system/domain';
import { IChangeStateAvailabilityInput } from '@rental-system/interfaces';
import { RegisterAvailabilityCommandPattern, UnregisterAvailabilityCommandPattern } from '@rental-system/microservices';
import { AvailabilityService } from '../application/availability.service';
import { RequestAvailability } from './decorators/request-availability.decorator';
import { AvailabilityTotalInputDto } from './dto/total-input.dto';
import { AvailabilityOutputDto } from './dto/output.dto';
import { AvailabilityGuard } from './guards/availability.guard';

@ApiTags('Availability')
@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Get(':availabilityId')
  @UseGuards(AvailabilityGuard)
  @ApiParam({ name: 'availabilityId' })
  @ApiOkResponse({ type: AvailabilityOutputDto })
  getById(@RequestAvailability() availability: AvailabilityEntity) {
    return new AvailabilityOutputDto(availability);
  }

  @Put(':availabilityId')
  @UseGuards(AvailabilityGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'availabilityId' })
  @ApiOkResponse({ type: AvailabilityOutputDto })
  async updateTotal(@RequestAvailability() availability: AvailabilityEntity, @Body() data: AvailabilityTotalInputDto) {
    await this.availabilityService.updateTotal(availability, data);
    return new AvailabilityOutputDto(availability);
  }

  @MessagePattern(new RegisterAvailabilityCommandPattern())
  async register(data: IChangeStateAvailabilityInput) {
    await this.availabilityService.register(data);
    return 'ok';
  }

  @MessagePattern(new UnregisterAvailabilityCommandPattern())
  async unregister(data: IChangeStateAvailabilityInput) {
    await this.availabilityService.unregister(data);
    return 'ok';
  }
}
