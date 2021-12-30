import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { AggregateId } from '@rental-system/common';
import { MicroservicesEnum } from '@rental-system/microservices';
import { ReservationsMicroserviceClient } from './reservations.microservice-client';

describe('ReservationsMicroserviceClient', () => {
  let client: ReservationsMicroserviceClient;
  let reservationsClientMock: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsMicroserviceClient,
        {
          provide: MicroservicesEnum.RESERVATIONS,
          useValue: { send: jest.fn().mockReturnValue(of('ok')) },
        },
      ],
    }).compile();

    client = module.get(ReservationsMicroserviceClient);
    reservationsClientMock = module.get(MicroservicesEnum.RESERVATIONS);
  });

  it('should send register availability message', async () => {
    expect(await client.unregisterCard(new AggregateId('id'))).toBe('ok');
    expect(reservationsClientMock.send).toHaveBeenCalledTimes(1);
  });
});
