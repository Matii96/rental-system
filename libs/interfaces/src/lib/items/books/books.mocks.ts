import { name, commerce } from 'faker';
import { v4 as uuidv4 } from 'uuid';
import { IBookInput } from './input/input.interface';
import { IBookOutput } from './output/output.interface';

export const bookInputMock = (): IBookInput => ({
  name: commerce.product(),
  author: name.findName(),
  pagesCount: 10,
});

export const bookOutputMock = (): IBookOutput => ({
  id: uuidv4(),
  createdAt: new Date(),
  name: commerce.product(),
  author: name.findName(),
  pagesCount: 10,
});
