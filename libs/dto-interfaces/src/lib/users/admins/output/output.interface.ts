import { IUserOutput } from '../../output/output.interface';

export interface IAdminOutput extends IUserOutput {
  agreedToNewsletter: boolean;
  salary: number;
}
