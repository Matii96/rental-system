import { v4 as uuidv4 } from 'uuid';
import { datatype, name, internet } from 'faker';
import { ICustomerInput } from './input/input.interface';
import { ICustomerInputSelf } from './input/input-self.interface';
import { ICustomerOutput } from './output/output.interface';

export const userCustomerInputMock = (): ICustomerInput => ({
  name: name.findName(),
  email: internet.email(),
  password: 'password',
  active: true,
  agreedToNewsletter: datatype.boolean(),
});

export const userCustomerInputSelfMock = (): ICustomerInputSelf => ({
  name: name.findName(),
  email: internet.email(),
  password: 'password',
  agreedToNewsletter: datatype.boolean(),
});

export const userCustomerOutputMock = (): ICustomerOutput => ({
  id: uuidv4(),
  name: name.findName(),
  email: internet.email(),
  agreedToNewsletter: datatype.boolean(),
});
