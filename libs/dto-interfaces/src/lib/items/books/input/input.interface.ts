import { IItemInput } from '../../input/input.interface';

export interface IBookInput extends IItemInput {
  pagesCount: number;
}
