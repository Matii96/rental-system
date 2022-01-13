import { Test, TestingModule } from '@nestjs/testing';
import { AggregateId } from '@rental-system/common';
import { ItemTypes } from '@rental-system/domain';
import { availabilityEntityMock } from '@rental-system/domain-testing';
import { AvailabilityService } from '../application/availability.service';
import { AvailabilityRepository } from '../infrastructure/database/repositories/availability.repository';
import { AvailabilityRestOutputDto } from './dto/rest-output.dto';
import { AvailabilityController } from './availability.controller';

describe('AvailabilityController', () => {
  let controller: AvailabilityController;
  let availabilityServiceMock: AvailabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvailabilityController],
      providers: [
        {
          provide: AvailabilityRepository,
          useValue: {},
        },
        {
          provide: AvailabilityService,
          useValue: { updateTotal: jest.fn(), register: jest.fn(), unregister: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get(AvailabilityController);
    availabilityServiceMock = module.get(AvailabilityService);
  });

  it('should get availability by id', () => {
    const availability = availabilityEntityMock();
    expect(controller.getById(availability)).toEqual(<AvailabilityRestOutputDto>{
      total: availability.getTotal(),
      reserved: availability.getReserved(),
    });
  });

  it('should update availability', async () => {
    const availability = availabilityEntityMock();
    expect(await controller.updateTotal(availability, { total: availability.getTotal() })).toEqual({
      total: availability.getTotal(),
      reserved: availability.getReserved(),
    } as AvailabilityRestOutputDto);
  });

  it('should register new item availability', async () => {
    expect(await controller.register({ id: 'id', type: <ItemTypes>Object.keys(ItemTypes)[0] })).toBe('ok');
    expect(availabilityServiceMock.register).toHaveBeenCalledTimes(1);
  });

  it('should unregister item availability', async () => {
    expect(await controller.unregister(new AggregateId('id'))).toBe('ok');
    expect(availabilityServiceMock.unregister).toHaveBeenCalledTimes(1);
  });
});
