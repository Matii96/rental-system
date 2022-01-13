import { Test, TestingModule } from '@nestjs/testing';
import { rentalEntityMock } from '@rental-system/domain-testing';
import { ReservationsMicroserviceClient } from '@rental-system/microservices';
import { RentalCardsRepository } from '../../rental-cards/infrastructure/database/repositories/rental-cards.repository';
import { RentalsService } from '../application/rentals.service';
import { RentalsRepository } from '../infrastructure/database/repositories/rentals.repository';
import { RentalRestOutputDto } from './dto/rest-output.dto';
import { RentalsController } from './rentals.controller';

describe('RentalsController', () => {
  let controller: RentalsController;
  let rentalsServiceMock: RentalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalsController],
      providers: [
        { provide: RentalCardsRepository, useValue: {} },
        { provide: ReservationsMicroserviceClient, useValue: {} },
        { provide: RentalsRepository, useValue: {} },
        { provide: RentalsService, useValue: { create: jest.fn(), prolong: jest.fn(), close: jest.fn() } },
      ],
    }).compile();

    controller = module.get(RentalsController);
    rentalsServiceMock = module.get(RentalsService);
  });

  it('should get rental by id', async () => {
    const rental = rentalEntityMock();
    expect(controller.getById(rental)).toEqual(new RentalRestOutputDto(rental));
  });
});
