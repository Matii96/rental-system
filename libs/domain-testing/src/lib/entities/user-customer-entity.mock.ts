import { v4 as uuidv4 } from 'uuid';
import { datatype, name, internet } from 'faker';
import { UserCustomerEntity } from '@rental-system/domain';

export const userCustomerEntityMock = () =>
  new UserCustomerEntity(uuidv4(), new Date(), name.findName(), internet.email(), 'password', datatype.boolean());
