import { IUserOutput } from './output.interface';

export interface IUserLoginOutput extends IUserOutput {
  jwt: string;
}
