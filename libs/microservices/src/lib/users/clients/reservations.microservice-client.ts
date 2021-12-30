import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AggregateId } from '@rental-system/common';
import { MicroservicesEnum } from '../../microservices.enum';
import { UnregisterRentalCardCommandPattern } from '../commands/unregister-rental-card.command-pattern';

@Injectable()
export class ReservationsMicroserviceClient {
  constructor(@Inject(MicroservicesEnum.RESERVATIONS) private readonly reservationsClient: ClientProxy) {}

  unregisterCard(id: AggregateId) {
    return firstValueFrom(this.reservationsClient.send<'ok'>(new UnregisterRentalCardCommandPattern(), id));
  }
}
