import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { BookEntity } from '@rental-system/domain';
import { FindAllSearchOptions } from '@rental-system/common';
import { SequelizeGenericRepository } from '@rental-system/database-storage';
import { BookModel } from '../models/book.model';
import { BooksModelFactory } from './factories/books-model.factory';

@Injectable()
export class BooksRepository extends SequelizeGenericRepository<BookEntity, BookModel> {
  constructor(@InjectModel(BookModel) model: typeof BookModel, modelFactory: BooksModelFactory) {
    super(model, modelFactory);
  }

  findAll(options: FindAllSearchOptions = {}) {
    const search = { [Op.like]: `%${options.search || ''}%` };
    const query: Record<string, unknown>[] = [{ name: search }, { author: search }];
    if (parseInt(options.search)) {
      query.push({ pagesCount: parseInt(options.search) });
    }
    return super.findAll(options, { [Op.or]: query });
  }
}
