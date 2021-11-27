import { Injectable } from '@nestjs/common';
import { FindAllSearchOptions, ICountableData } from '@rental-system/common';
import { BookEntity } from '@rental-system/domain';
import { IBookInput } from '@rental-system/dto-interfaces';
import { BooksRepository } from '../infrastructure/database/repositories/books.repository';
import { BooksMicroservicesSender } from '../infrastructure/microservices-senders/books.microservices-sender';
import { BooksFactory } from './factories/books.factory';

@Injectable()
export class BooksService {
  constructor(
    private readonly factory: BooksFactory,
    private readonly repository: BooksRepository,
    private readonly microservicesSenders: BooksMicroservicesSender
  ) {}

  async getAll(options: FindAllSearchOptions): Promise<ICountableData<BookEntity>> {
    const [data, total] = await Promise.all([this.repository.findAll(options), this.repository.count()]);
    return { data, total };
  }

  async create(data: IBookInput) {
    const book = this.factory.create(data);
    await this.repository.transaction(async (t) => {
      await this.repository.create(book, t);
      await this.microservicesSenders.registerAvailability(book);
    });
    return book;
  }

  async update(book: BookEntity, data: IBookInput) {
    book.name = data.name;
    book.author = data.author;
    book.pagesCount = data.pagesCount;
    await this.repository.update(book);
    return book;
  }

  async delete(book: BookEntity) {
    await this.repository.transaction(async (t) => {
      await this.repository.delete(book, t);
      await this.microservicesSenders.unregisterAvailability(book);
    });
    return book;
  }
}
