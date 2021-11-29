import { v4 as uuidv4 } from 'uuid';
import { AggregateId } from '@rental-system/common';
import { RentalEntity } from '@rental-system/domain';

export const rentalEntityMock = () =>
  new RentalEntity(
    new AggregateId(uuidv4()),
    new AggregateId(uuidv4()),
    new AggregateId(uuidv4()),
    new Date(),
    null,
    new Date(),
    0,
    2
  );
