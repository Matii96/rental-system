import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BookEntity, ItemTypes } from '@rental-system/domain';
import { IChangeStateAvailabilityInput } from '@rental-system/interfaces';
import {
  MicroservicesEnum,
  RegisterAvailabilityCommandPattern,
  UnregisterAvailabilityCommandPattern,
} from '@rental-system/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BooksMicroservicesSender {
  constructor(@Inject(MicroservicesEnum.AVAILABILITY) private readonly availabilityClient: ClientProxy) {}

  registerAvailability(book: BookEntity) {
    return firstValueFrom(
      this.availabilityClient.send<'ok'>(new RegisterAvailabilityCommandPattern(), <IChangeStateAvailabilityInput>{
        id: book.id.toString(),
        type: ItemTypes.BOOK,
      })
    );
  }

  unregisterAvailability(book: BookEntity) {
    return firstValueFrom(
      this.availabilityClient.send<'ok'>(new UnregisterAvailabilityCommandPattern(), <IChangeStateAvailabilityInput>{
        id: book.id.toString(),
        type: ItemTypes.BOOK,
      })
    );
  }
}
