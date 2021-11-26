import { v4 as uuidv4 } from 'uuid';
import { name, commerce } from 'faker';
import { AggregateId } from '@rental-system/common';
import { BookEntity } from '@rental-system/domain';

export const bookEntityMock = () =>
  new BookEntity(new AggregateId(uuidv4()), new Date(), commerce.product(), name.findName(), 10);
