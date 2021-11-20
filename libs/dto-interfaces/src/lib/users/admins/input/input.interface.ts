import { IUserInput } from '../../input/input.interface';

export interface IAdminInput extends IUserInput {
  agreedToNewsletter: boolean;
  salary: number;
}
