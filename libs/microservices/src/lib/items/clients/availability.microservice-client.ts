import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AggregateId } from '@rental-system/common';
import { IItem } from '@rental-system/domain';
import { AvailabilityCreateInputDto } from '@rental-system/dto';
import { firstValueFrom } from 'rxjs';
import { MicroservicesEnum } from '../../microservices.enum';
import { RegisterAvailabilityCommandPattern } from '../commands/register-availability.command-pattern';
import { UnregisterAvailabilityCommandPattern } from '../commands/unregister-availability.command-pattern';
import { ReserveItemCommandPattern } from '../commands/reserve-item.command-pattern';
import { ReleaseItemCommandPattern } from '../commands/release-item.command-pattern';

@Injectable()
export class AvailabilityMicroserviceClient {
  constructor(@Inject(MicroservicesEnum.AVAILABILITY) private readonly availabilityClient: ClientProxy) {}

  async registerAvailability(item: IItem) {
    await firstValueFrom(
      this.availabilityClient.send<'ok'>(new RegisterAvailabilityCommandPattern(), <AvailabilityCreateInputDto>{
        id: item.id.toString(),
        type: item.type,
      })
    );
  }

  async unregisterAvailability(item: IItem) {
    await firstValueFrom(this.availabilityClient.send<'ok'>(new UnregisterAvailabilityCommandPattern(), item.id));
  }

  async reserveItem(itemId: AggregateId) {
    await firstValueFrom(this.availabilityClient.send<'ok'>(new ReserveItemCommandPattern(), itemId));
  }

  async releaseItem(itemId: AggregateId) {
    await firstValueFrom(this.availabilityClient.send<'ok'>(new ReleaseItemCommandPattern(), itemId));
  }
}
