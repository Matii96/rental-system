import { datatype, name, internet } from 'faker';
import { AggregateId } from '@rental-system/common';
import { UserAdminEntity } from '@rental-system/domain';

export const userAdminEntityMock = () => {
  const user = new UserAdminEntity(
    new AggregateId(),
    new Date(),
    name.findName(),
    internet.email(),
    'password',
    true,
    datatype.number({ min: 1000, max: 10000 }),
    datatype.boolean()
  );
  user.setPassword('password', 8);
  return user;
};
