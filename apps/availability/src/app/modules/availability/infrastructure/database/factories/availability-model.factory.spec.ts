import { Test, TestingModule } from '@nestjs/testing';
import { availabilityEntityMock } from '@rental-system/domain-testing';
import { availabilityModelObjectMock } from '../../../availability.fixtures';
import { AvailabilityModelFactory } from './availability-model.factory';

describe('AvailabilityModelFactory', () => {
  let factory: AvailabilityModelFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvailabilityModelFactory],
    }).compile();

    factory = module.get(AvailabilityModelFactory);
  });

  it('should map entity to model', () => {
    const availability = availabilityEntityMock();
    expect(factory.entityToModel(availability)).toEqual(availabilityModelObjectMock(availability));
  });

  it('should map model to entity', () => {
    const availability = availabilityEntityMock();
    expect(factory.modelToEntity(availabilityModelObjectMock(availability))).toEqual(availability);
  });
});
