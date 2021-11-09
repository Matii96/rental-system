import { v4 as uuidv4 } from 'uuid';
import { datatype, name, internet } from 'faker';
import { UserAdminEntity } from '@rental-system/domain';

export const userAdminEntityMock = () =>
  new UserAdminEntity(
    uuidv4(),
    new Date(),
    name.findName(),
    internet.email(),
    'password',
    datatype.number({ min: 1000, max: 10000 }),
    datatype.boolean()
  );
