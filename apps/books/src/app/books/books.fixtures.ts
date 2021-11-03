import { bookEntityMock } from '@rental-system/domain-testing';
import { BookInputDto } from './dto/input.dto';

export const bookInputMock = (book = bookEntityMock()) => {
  const dto = new BookInputDto();
  dto.name = book.name;
  dto.author = book.author;
  dto.pagesCount = book.pagesCount;
  return dto;
};
