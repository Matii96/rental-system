import { Injectable } from '@nestjs/common';
import { FindAllSearchOptions, ICountableData } from '@rental-system/common';
import { BooksRepository } from '../infrastructure/database/repositories/books.repository';
import { BookInputDto } from '../presentation/dto/input.dto';
import { BookOutputDto } from '../presentation/dto/output.dto';
import { BooksFactory } from './factories/books-model.factory';

@Injectable()
export class BooksService {
  constructor(private readonly factory: BooksFactory, private readonly repository: BooksRepository) {}

  async getAll(options: FindAllSearchOptions): Promise<ICountableData<BookOutputDto>> {
    const [books, total] = await Promise.all([this.repository.findAll(options), this.repository.count()]);
    return { data: books.map((book) => new BookOutputDto(book)), total };
  }

  async create(data: BookInputDto) {
    const book = this.factory.create(data);
    await this.repository.create(book);
    return new BookOutputDto(book);
  }
}