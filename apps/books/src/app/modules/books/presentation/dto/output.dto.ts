import { ApiProperty } from '@nestjs/swagger';
import { BookEntity } from '@rental-system/domain';
import { IBookOutput } from '@rental-system/interfaces';

export class BookOutputDto implements IBookOutput {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  pagesCount: number;

  constructor(book: BookEntity) {
    this.id = book.id.toString();
    this.createdAt = book.createdAt;
    this.name = book.name;
    this.author = book.author;
    this.pagesCount = book.pagesCount;
  }
}
