import { v4 as uuidv4 } from 'uuid';
import { AggregateId } from '@rental-system/common';
import { AvailabilityEntity, ItemTypes } from '@rental-system/domain';

export const availabilityEntityMock = () => new AvailabilityEntity(new AggregateId(uuidv4()), ItemTypes.BOOK, 10, 5);
