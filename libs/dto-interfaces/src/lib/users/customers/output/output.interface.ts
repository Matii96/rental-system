import { IUserOutput } from '../../output/output.interface';

export interface ICustomerOutput extends IUserOutput {
  agreedToNewsletter: boolean;
}
