import { Injectable } from '@nestjs/common';
import { BookEntity } from '@rental-system/domain';
import { IEntityModelFactory } from '@rental-system/common';
import { BookModel } from '../../models/book.model';

@Injectable()
export class BooksModelFactory implements IEntityModelFactory<BookEntity, BookModel> {
  entityToModel(book: BookEntity): BookModel {
    return <BookModel>{
      id: book.id,
      name: book.name,
      author: book.author,
      pagesCount: book.pagesCount,
      createdAt: book.createdAt,
    };
  }

  modelToEntity(model: BookModel): BookEntity {
    return new BookEntity(model.id, model.createdAt, model.name, model.author, model.pagesCount);
  }
}
