import { v4 as uuidv4 } from 'uuid';
import { AggregateId } from '@rental-system/common';
import { OpenRentalPolicy, RentalCardEntity } from '@rental-system/domain';

export const rentalCardEntityMock = (activeRentals = [new AggregateId(uuidv4()), new AggregateId(uuidv4())]) =>
  new RentalCardEntity(
    new AggregateId(uuidv4()),
    new AggregateId(uuidv4()),
    activeRentals,
    new OpenRentalPolicy({ countLimit: 5 })
  );
