import { IUserInputSelf } from '@rental-system/dto-interfaces';

export interface IAdminInputSelf extends IUserInputSelf {
  agreedToNewsletter: boolean;
}
