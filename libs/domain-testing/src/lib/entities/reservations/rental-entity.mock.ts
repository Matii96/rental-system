import { AggregateId } from '@rental-system/common';
import { RentalEntity } from '@rental-system/domain';

export const rentalEntityMock = () => {
  const expectedReturnDate = new Date();
  expectedReturnDate.setHours(expectedReturnDate.getHours() + 12);

  return new RentalEntity(
    new AggregateId(),
    new AggregateId(),
    new AggregateId(),
    new Date(),
    null,
    expectedReturnDate,
    0,
    2
  );
};
