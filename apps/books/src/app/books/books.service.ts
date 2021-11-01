import { Injectable } from '@nestjs/common';
import { FindAllSearchOptions, ICountableData } from '@rental-system/common';
import { BooksRepository } from './repositories/books.repository';
import { BookOutputDto } from './dto/output.dto';

@Injectable()
export class BooksService {
  constructor(private readonly repository: BooksRepository) {}

  async getAll(options: FindAllSearchOptions): Promise<ICountableData<BookOutputDto>> {
    const [books, total] = await Promise.all([this.repository.findAll(options), this.repository.count()]);
    return { data: books.map((book) => new BookOutputDto(book)), total };
  }
}
