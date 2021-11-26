import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { AggregateId } from '@rental-system/common';
import { IItemAvailability } from '@rental-system/dto-interfaces';
import { RegisterAvailabilityCommandPattern, UnregisterAvailabilityCommandPattern } from '@rental-system/microservices';
import { AvailabilityService } from '../application/availability.service';

@ApiTags('Availability')
@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @MessagePattern(new RegisterAvailabilityCommandPattern())
  async register(data: IItemAvailability) {
    data.id = plainToClass(AggregateId, data.id);
    await this.availabilityService.register(data);
    return 'ok';
  }

  @MessagePattern(new UnregisterAvailabilityCommandPattern())
  async unregister(data: IItemAvailability) {
    data.id = plainToClass(AggregateId, data.id);
    await this.availabilityService.unregister(data);
    return 'ok';
  }
}
