import { v4 as uuidv4 } from 'uuid';
import { AvailabilityEntity, ItemTypes } from '@rental-system/domain';

export const availabilityEntityMock = () => new AvailabilityEntity(uuidv4(), ItemTypes.BOOK, 10, 5);
