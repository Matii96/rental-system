import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { AggregateId } from '@rental-system/common';
import { RentalCardEntity } from '@rental-system/domain';
import { MicroservicesEnum } from '../../microservices.enum';
import { UnregisterRentalCardCommandPattern } from '../commands/unregister-rental-card.command-pattern';
import { RentalCardGetByIdQueryPattern } from '../queries/rental-card-get-by-id.query-pattern';

@Injectable()
export class ReservationsMicroserviceClient {
  constructor(@Inject(MicroservicesEnum.RESERVATIONS) private readonly reservationsClient: ClientProxy) {}

  async getCardById(id: AggregateId) {
    return plainToClass(
      RentalCardEntity,
      await firstValueFrom(this.reservationsClient.send<RentalCardEntity>(new RentalCardGetByIdQueryPattern(), id))
    );
  }

  unregisterCard(id: AggregateId) {
    return firstValueFrom(this.reservationsClient.send<'ok'>(new UnregisterRentalCardCommandPattern(), id));
  }
}
