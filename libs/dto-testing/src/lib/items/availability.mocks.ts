import { datatype } from 'faker';
import { plainToClass } from 'class-transformer';
import { AvailabilityOutputDto, AvailabilityTotalInputDto } from '@rental-system/dto';

export const availabilityTotalInputMock = () =>
  plainToClass(AvailabilityTotalInputDto, {
    total: datatype.number(10),
  });
