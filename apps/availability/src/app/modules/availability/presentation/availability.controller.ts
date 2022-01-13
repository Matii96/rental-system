import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { AggregateId } from '@rental-system/common';
import { UserAccess } from '@rental-system/auth';
import { AvailabilityEntity, UserAdminEntity } from '@rental-system/domain';
import { AvailabilityCreateInputDto } from '@rental-system/dto';
import { RegisterAvailabilityCommandPattern, UnregisterAvailabilityCommandPattern } from '@rental-system/microservices';
import { AvailabilityService } from '../application/availability.service';
import { AvailabilityGuard } from './guards/availability.guard';
import { RequestAvailability } from './decorators/request-availability.decorator';
import { AvailabilityRestOutputDto } from './dto/rest-output.dto';
import { AvailabilityTotalRestInputDto } from './dto/rest-total-input.dto';

@ApiTags('Availability')
@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Get(':availabilityId')
  @UseGuards(AvailabilityGuard)
  @ApiParam({ name: 'availabilityId' })
  @ApiOkResponse({ type: AvailabilityRestOutputDto })
  getById(@RequestAvailability() availability: AvailabilityEntity) {
    return new AvailabilityRestOutputDto(availability);
  }

  @Put(':availabilityId')
  @UseGuards(AvailabilityGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'availabilityId' })
  @ApiOkResponse({ type: AvailabilityRestOutputDto })
  async updateTotal(
    @RequestAvailability() availability: AvailabilityEntity,
    @Body() data: AvailabilityTotalRestInputDto
  ) {
    await this.availabilityService.updateTotal(availability, data);
    return new AvailabilityRestOutputDto(availability);
  }

  @MessagePattern(new RegisterAvailabilityCommandPattern())
  async register(data: AvailabilityCreateInputDto) {
    await this.availabilityService.register(plainToClass(AvailabilityCreateInputDto, data));
    return 'ok';
  }

  @MessagePattern(new UnregisterAvailabilityCommandPattern())
  async unregister(itemId: AggregateId) {
    await this.availabilityService.unregister(plainToClass(AggregateId, itemId));
    return 'ok';
  }
}
