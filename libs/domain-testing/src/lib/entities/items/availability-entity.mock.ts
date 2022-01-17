import { datatype } from 'faker';
import { AggregateId } from '@rental-system/common';
import { AvailabilityEntity, ItemTypes } from '@rental-system/domain';

export const availabilityEntityMock = () =>
  new AvailabilityEntity(new AggregateId(), ItemTypes.BOOK, datatype.number(10), datatype.number(8));
