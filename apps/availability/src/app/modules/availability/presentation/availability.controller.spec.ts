import { Test, TestingModule } from '@nestjs/testing';
import { AggregateId } from '@rental-system/common';
import { availabilityEntityMock } from '@rental-system/domain-testing';
import { AvailabilityService } from '../application/availability.service';
import { AvailabilityRepository } from '../infrastructure/database/repositories/availability.repository';
import { AvailabilityController } from './availability.controller';
import { AvailabilityOutputDto } from './dto/output.dto';

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
    expect(controller.getById(availability)).toEqual(<AvailabilityOutputDto>{
      total: availability.getTotal(),
      reserved: availability.getReserved(),
    });
  });

  it('should update availability', async () => {
    const availability = availabilityEntityMock();
    expect(await controller.updateTotal(availability, { total: availability.getTotal() })).toEqual({
      total: availability.getTotal(),
      reserved: availability.getReserved(),
    } as AvailabilityOutputDto);
  });

  it('should register new item availability', async () => {
    // @ts-ignore
    expect(await controller.register({ id: new AggregateId('id'), type: 'ITEM' })).toBe('ok');
    expect(availabilityServiceMock.register).toHaveBeenCalledTimes(1);
  });

  it('should unregister new item availability', async () => {
    // @ts-ignore
    expect(await controller.unregister({ id: new AggregateId('id'), type: 'ITEM' })).toBe('ok');
    expect(availabilityServiceMock.unregister).toHaveBeenCalledTimes(1);
  });
});
