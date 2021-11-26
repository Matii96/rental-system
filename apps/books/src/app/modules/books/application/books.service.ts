import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AggregateId, FindAllSearchOptions, ICountableData } from '@rental-system/common';
import { BookEntity, ItemTypes } from '@rental-system/domain';
import { IBookInput, IItemAvailability } from '@rental-system/dto-interfaces';
import {
  MicroservicesEnum,
  RegisterAvailabilityCommandPattern,
  UnregisterAvailabilityCommandPattern,
} from '@rental-system/microservices';
import { BooksRepository } from '../infrastructure/database/repositories/books.repository';
import { BooksFactory } from './factories/books.factory';

@Injectable()
export class BooksService {
  constructor(
    @Inject(MicroservicesEnum.AVAILABILITY) private readonly availabilityClient: ClientProxy,
    private readonly factory: BooksFactory,
    private readonly repository: BooksRepository
  ) {}

  getById(id: AggregateId) {
    return this.repository.findById(id);
  }

  async getAll(options: FindAllSearchOptions): Promise<ICountableData<BookEntity>> {
    const [data, total] = await Promise.all([this.repository.findAll(options), this.repository.count()]);
    return { data, total };
  }

  async create(data: IBookInput) {
    const book = this.factory.create(data);
    await this.repository.transaction(async (t) => {
      await this.repository.create(book, t);
      await firstValueFrom(
        this.availabilityClient.send(new RegisterAvailabilityCommandPattern(), <IItemAvailability>{
          id: book.id,
          type: ItemTypes.BOOK,
        })
      );
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
      await firstValueFrom(
        this.availabilityClient.send(new UnregisterAvailabilityCommandPattern(), <IItemAvailability>{
          id: book.id,
          type: ItemTypes.BOOK,
        })
      );
    });
    return book;
  }
}
