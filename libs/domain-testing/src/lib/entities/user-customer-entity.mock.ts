import { v4 as uuidv4 } from 'uuid';
import { datatype, name, internet } from 'faker';
import { UserCustomerEntity } from '@rental-system/domain';

export const userCustomerEntityMock = () => {
  const user = new UserCustomerEntity(
    uuidv4(),
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
