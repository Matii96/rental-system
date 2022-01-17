import { AggregateId } from '@rental-system/common';
import { OpenRentalPolicy, RentalCardEntity } from '@rental-system/domain';

export const rentalCardEntityMock = (activeRentals = [new AggregateId(), new AggregateId()]) =>
  new RentalCardEntity(new AggregateId(), new AggregateId(), activeRentals, new OpenRentalPolicy({ countLimit: 5 }));
