import { ApiProperty } from '@nestjs/swagger';
import { BookEntity } from '@rental-system/domain';

export class BookOutputDto {
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
    this.id = book.id;
    this.createdAt = book.createdAt;
    this.name = book.name;
    this.author = book.author;
    this.pagesCount = book.pagesCount;
  }
}
