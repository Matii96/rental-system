import { Test, TestingModule } from '@nestjs/testing';
import { AvailabilityEntity, ItemTypes } from '@rental-system/domain';
import { AvailabilityFactory } from './availability.factory';

describe('AvailabilityFactory', () => {
  let factory: AvailabilityFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvailabilityFactory],
    }).compile();

    factory = module.get(AvailabilityFactory);
  });

  it('should create new entity', () => {
    expect(factory.create({ id: 'id', type: <ItemTypes>Object.keys(ItemTypes)[0] })).toBeInstanceOf(AvailabilityEntity);
  });
});
