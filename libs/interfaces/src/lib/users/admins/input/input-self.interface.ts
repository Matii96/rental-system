import { IUserInputSelf } from '../../input/input-self.interface';

export interface IAdminInputSelf extends IUserInputSelf {
  agreedToNewsletter: boolean;
}
