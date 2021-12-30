import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { microservicesClientFactory } from '@rental-system/config';
import { MicroservicesEnum } from './microservices.enum';
import { AvailabilityMicroserviceClient } from './items/clients/availability.microservice-client';
import { ReservationsMicroserviceClient } from './users/clients/reservations.microservice-client';
import { UsersMicroserviceClient } from './users/clients/users.microservice-client';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: MicroservicesEnum.USERS,
        inject: [ConfigService],
        useFactory: microservicesClientFactory,
      },
      {
        name: MicroservicesEnum.RESERVATIONS,
        inject: [ConfigService],
        useFactory: microservicesClientFactory,
      },
      {
        name: MicroservicesEnum.AVAILABILITY,
        inject: [ConfigService],
        useFactory: microservicesClientFactory,
      },
    ]),
  ],
  providers: [AvailabilityMicroserviceClient, UsersMicroserviceClient, ReservationsMicroserviceClient],
  exports: [AvailabilityMicroserviceClient, UsersMicroserviceClient, ReservationsMicroserviceClient],
})
export class MicroservicesModule {}
