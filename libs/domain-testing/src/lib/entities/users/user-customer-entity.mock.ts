import { datatype, name, internet } from 'faker';
import { AggregateId } from '@rental-system/common';
import { UserCustomerEntity } from '@rental-system/domain';

export const userCustomerEntityMock = () => {
  const user = new UserCustomerEntity(
    new AggregateId(),
    new Date(),
    name.findName(),
    internet.email(),
    'password',
    true,
    datatype.boolean()
  );
  user.setPassword('password', 8);
  return user;
};
