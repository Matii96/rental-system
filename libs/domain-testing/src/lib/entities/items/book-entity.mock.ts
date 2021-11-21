import { v4 as uuidv4 } from 'uuid';
import { name, commerce } from 'faker';
import { BookEntity } from '@rental-system/domain';

export const bookEntityMock = () => new BookEntity(uuidv4(), new Date(), commerce.product(), name.findName(), 10);
