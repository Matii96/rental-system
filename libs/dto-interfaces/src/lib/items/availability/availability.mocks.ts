import { datatype } from 'faker';
import { IAvailabilityOutput } from './output/output.interface';
import { IAvailabilityTotalInput } from './input/total-input.interface';

export const availabilityTotalInputMock = (): IAvailabilityTotalInput => ({
  total: datatype.number(10),
});

export const availabilityOutputMock = (): IAvailabilityOutput => ({
  total: datatype.number(10),
  reserved: datatype.number(8),
});
