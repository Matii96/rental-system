import { Injectable } from '@nestjs/common';
import { FindAllSearchOptions, ICountableData } from '@rental-system/common';
import { BookEntity } from '@rental-system/domain';
import { IBookInput } from '@rental-system/dto-interfaces';
import { BooksRepository } from '../infrastructure/database/repositories/books.repository';
import { BooksFactory } from './factories/books.factory';

@Injectable()
export class BooksService {
  constructor(private readonly factory: BooksFactory, private readonly repository: BooksRepository) {}

  async getAll(options: FindAllSearchOptions): Promise<ICountableData<BookEntity>> {
    const [data, total] = await Promise.all([this.repository.findAll(options), this.repository.count()]);
    return { data, total };
  }

  async create(data: IBookInput) {
    const book = this.factory.create(data);
    await this.repository.create(book);
    return book;
  }
}
