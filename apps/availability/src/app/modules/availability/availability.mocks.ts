// export const availabilityInputMock = (availability = availabilityEntityMock()) => {
//   const dto = new availabilityInputDto();
//   dto.name = availability.name;
//   dto.author = availability.author;
//   dto.pagesCount = availability.pagesCount;
//   return dto;
// };

import { AvailabilityEntity } from '@rental-system/domain';
import { AvailabilityModel } from './infrastructure/database/models/availability.model';

export const availabilityModelObjectMock = (availability: AvailabilityEntity) =>
  <AvailabilityModel>{
    id: availability.id.toString(),
    type: availability.type,
    total: availability.getTotal(),
    reserved: availability.getReserved(),
  };
