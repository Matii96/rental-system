import { Test, TestingModule } from '@nestjs/testing';
import { AvailabilityEntity } from '@rental-system/domain';
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
    // @ts-ignore
    expect(factory.create({ id: 'id', type: 'ITEM' })).toBeInstanceOf(AvailabilityEntity);
  });
});
