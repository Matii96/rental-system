import { name, commerce } from 'faker';
import { AggregateId } from '@rental-system/common';
import { BookEntity } from '@rental-system/domain';

export const bookEntityMock = () =>
  new BookEntity(new AggregateId(), new Date(), commerce.product(), name.findName(), 10);
