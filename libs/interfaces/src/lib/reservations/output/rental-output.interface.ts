export interface IRentalOutput {
  id: string;
  itemId: string;
  registrationDate: Date;
  returnDate: Date;
  expectedReturnDate: Date;
  prolongCounter: number;
  maxProlongations: number;
  isClosed: boolean;
}
