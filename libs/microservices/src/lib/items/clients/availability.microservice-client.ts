import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IItem } from '@rental-system/domain';
import { ICreateAvailabilityInput } from '@rental-system/interfaces';
import { firstValueFrom } from 'rxjs';
import { MicroservicesEnum } from '../../microservices.enum';
import { RegisterAvailabilityCommandPattern } from '../commands/register-availability.command-pattern';
import { UnregisterAvailabilityCommandPattern } from '../commands/unregister-availability.command-pattern';

@Injectable()
export class AvailabilityMicroserviceClient {
  constructor(@Inject(MicroservicesEnum.AVAILABILITY) private readonly availabilityClient: ClientProxy) {}

  registerAvailability(item: IItem) {
    return firstValueFrom(
      this.availabilityClient.send<'ok'>(new RegisterAvailabilityCommandPattern(), <ICreateAvailabilityInput>{
        id: item.id.toString(),
        type: item.type,
      })
    );
  }

  unregisterAvailability(item: IItem) {
    return firstValueFrom(this.availabilityClient.send<'ok'>(new UnregisterAvailabilityCommandPattern(), item.id));
  }
}
