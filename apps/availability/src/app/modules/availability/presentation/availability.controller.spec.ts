import { Test, TestingModule } from '@nestjs/testing';
import { AggregateId } from '@rental-system/common';
import { AvailabilityService } from '../application/availability.service';
import { AvailabilityController } from './availability.controller';

describe('AvailabilityController', () => {
  let controller: AvailabilityController;
  let availabilityServiceMock: AvailabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvailabilityController],
      providers: [
        {
          provide: AvailabilityService,
          useValue: { register: jest.fn(), unregister: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get(AvailabilityController);
    availabilityServiceMock = module.get(AvailabilityService);
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
