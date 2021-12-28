import { IItemOutput } from '../../output/output.interface';

export interface IBookOutput extends IItemOutput {
  pagesCount: number;
}
