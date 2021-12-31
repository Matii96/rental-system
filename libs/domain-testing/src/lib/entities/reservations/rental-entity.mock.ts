import { v4 as uuidv4 } from 'uuid';
import { AggregateId } from '@rental-system/common';
import { RentalEntity } from '@rental-system/domain';

export const rentalEntityMock = () => {
  const expectedReturnDate = new Date();
  expectedReturnDate.setHours(expectedReturnDate.getHours() + 12);

  return new RentalEntity(
    new AggregateId(uuidv4()),
    new AggregateId(uuidv4()),
    new AggregateId(uuidv4()),
    new Date(),
    null,
    expectedReturnDate,
    0,
    2
  );
};
