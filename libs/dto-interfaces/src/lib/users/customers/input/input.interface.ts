import { IUserInput } from '../../input/input.interface';

export interface ICustomerInput extends IUserInput {
  agreedToNewsletter: boolean;
}
