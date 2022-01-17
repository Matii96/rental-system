import { Test, TestingModule } from '@nestjs/testing';
import { AggregateId } from '@rental-system/common';
import { bookEntityMock } from '@rental-system/domain-testing';
import { of } from 'rxjs';
import { MicroservicesEnum } from '../../microservices.enum';
import { AvailabilityMicroserviceClient } from './availability.microservice-client';

describe('AvailabilityMicroserviceClient', () => {
  let client: AvailabilityMicroserviceClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvailabilityMicroserviceClient,
        {
          provide: MicroservicesEnum.AVAILABILITY,
          useValue: { send: jest.fn(() => of('ok')) },
        },
      ],
    }).compile();

    client = module.get(AvailabilityMicroserviceClient);
  });

  it('should send register availability message', async () => {
    expect(await client.registerAvailability(bookEntityMock())).toBeUndefined();
  });

  it('should send unregister availability message', async () => {
    expect(await client.unregisterAvailability(bookEntityMock())).toBeUndefined();
  });

  it('should send reserve item message', async () => {
    expect(await client.reserveItem(new AggregateId())).toBeUndefined();
  });

  it('should send release item message', async () => {
    expect(await client.releaseItem(new AggregateId())).toBeUndefined();
  });
});
