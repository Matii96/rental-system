import { IUserInput } from '@rental-system/dto-interfaces';

export interface IAdminInput extends IUserInput {
  agreedToNewsletter: boolean;
  salary: number;
}
