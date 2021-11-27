import { v4 as uuidv4 } from 'uuid';
import { datatype } from 'faker';
import { AggregateId } from '@rental-system/common';
import { AvailabilityEntity, ItemTypes } from '@rental-system/domain';

export const availabilityEntityMock = () =>
  new AvailabilityEntity(new AggregateId(uuidv4()), ItemTypes.BOOK, datatype.number(10), datatype.number(8));
