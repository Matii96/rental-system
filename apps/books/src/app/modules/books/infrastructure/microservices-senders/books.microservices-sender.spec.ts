import { Test, TestingModule } from '@nestjs/testing';
import { bookEntityMock } from '@rental-system/domain-testing';
import { MicroservicesEnum } from '@rental-system/microservices';
import { of } from 'rxjs';
import { BooksMicroservicesSender } from './books.microservices-sender';

describe('BooksMicroservicesSenders', () => {
  let sender: BooksMicroservicesSender;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksMicroservicesSender,
        {
          provide: MicroservicesEnum.AVAILABILITY,
          useValue: { send: jest.fn(() => of('ok')) },
        },
      ],
    }).compile();

    sender = module.get(BooksMicroservicesSender);
  });

  it('should send register availability message', async () => {
    expect(await sender.registerAvailability(bookEntityMock())).toBe('ok');
  });

  it('should send unregister availability message', async () => {
    expect(await sender.unregisterAvailability(bookEntityMock())).toBe('ok');
  });
});
