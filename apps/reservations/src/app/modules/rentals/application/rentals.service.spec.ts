import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { rentalCardEntityMock } from '@rental-system/domain-testing';
import { UsersMicroserviceClient } from '@rental-system/microservices';
import { ReservationsConfig } from '../../../infrastructure/config/config.validator';
import { RentalCardsRepository } from '../infrastructure/database/repositories/rental-cards.repository';
import { RentalCardsFactory } from './factories/rental-cards.factory';
import { RentalCardsService } from './rental-cards.service';

describe('RentalCardsService', () => {
  let service: RentalCardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env', 'apps/reservations/.env'],
          validate: ReservationsConfig.validate,
        }),
      ],
      providers: [
        RentalCardsService,
        {
          provide: RentalCardsFactory,
          useValue: { create: jest.fn(() => rentalCardEntityMock()) },
        },
        {
          provide: RentalCardsRepository,
          useValue: {},
        },
        {
          provide: UsersMicroserviceClient,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get(RentalCardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
