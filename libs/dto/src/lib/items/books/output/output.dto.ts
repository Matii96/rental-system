import { BookEntity } from '@rental-system/domain';
import { ItemOutputDto } from '../../output/output.dto';

export class BookOutputDto extends ItemOutputDto {
  readonly pagesCount: number;

  constructor(book: BookEntity) {
    super(book);
    this.pagesCount = book.pagesCount;
  }
}
