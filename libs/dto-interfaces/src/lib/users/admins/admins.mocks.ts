import { v4 as uuidv4 } from 'uuid';
import { datatype, name, internet } from 'faker';
import { IAdminInput } from './input/input.interface';
import { IAdminInputSelf } from './input/input-self.interface';
import { IAdminOutput } from './output/output.interface';

export const userAdminInputMock = (): IAdminInput => ({
  name: name.findName(),
  email: internet.email(),
  password: 'password',
  active: true,
  salary: datatype.number({ min: 1000, max: 10000 }),
  agreedToNewsletter: datatype.boolean(),
});

export const userAdminInputSelfMock = (): IAdminInputSelf => ({
  name: name.findName(),
  email: internet.email(),
  password: 'password',
  agreedToNewsletter: datatype.boolean(),
});

export const userAdminOutputMock = (): IAdminOutput => ({
  id: uuidv4(),
  name: name.findName(),
  email: internet.email(),
  salary: datatype.number({ min: 1000, max: 10000 }),
  agreedToNewsletter: datatype.boolean(),
});
