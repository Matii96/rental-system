import { name, commerce } from 'faker';
import { plainToClass } from 'class-transformer';
import { BookInputDto } from '@rental-system/dto';

export const bookInputMock = () =>
  plainToClass(BookInputDto, {
    name: commerce.product(),
    author: name.findName(),
    pagesCount: 10,
  });
