import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { IItem } from '@rental-system/domain';
import { RegisterAvailabilityCommandPattern } from '@rental-system/microservices';
import { AvailabilityService } from '../application/availability.service';

@ApiTags('Availability')
@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @MessagePattern(new RegisterAvailabilityCommandPattern())
  register(item: IItem) {
    return this.availabilityService.register(item);
  }
}
