import { IUserInputSelf } from '@rental-system/dto-interfaces';

export interface ICustomerInputSelf extends IUserInputSelf {
  agreedToNewsletter: boolean;
}
