import { RentalEntity } from '@rental-system/domain';
import { RentalModel } from './infrastructure/database/models/rental.model';

export const rentalModelMock = (rental: RentalEntity) =>
  <RentalModel>{
    id: rental.id.toString(),
    itemId: rental.itemId.toString(),
    cardId: rental.cardId.toString(),
    returnDate: null,
    expectedReturnDate: rental.getExpectedReturnDate(),
    prolongCounter: rental.getProlongCounter(),
  };
