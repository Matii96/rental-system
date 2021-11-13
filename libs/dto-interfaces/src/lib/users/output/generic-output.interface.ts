import { UserTypes } from '@rental-system/domain';
import { IUserOutput } from './output.interface';

export interface IUserGenericOutput extends IUserOutput {
  type: UserTypes;
}
