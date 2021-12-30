import { Test, TestingModule } from '@nestjs/testing';
import { bookEntityMock } from '@rental-system/domain-testing';
import { MicroservicesEnum } from '@rental-system/microservices';
import { of } from 'rxjs';
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
    expect(await client.registerAvailability(bookEntityMock())).toBe('ok');
  });

  it('should send unregister availability message', async () => {
    expect(await client.unregisterAvailability(bookEntityMock())).toBe('ok');
  });
});
