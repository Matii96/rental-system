import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { BookEntity } from '@rental-system/domain';
import { AggregateId, IEntityFactory } from '@rental-system/common';
import { BookInputDto } from '@rental-system/dto';

@Injectable()
export class BooksFactory implements IEntityFactory<BookEntity> {
  create(data: BookInputDto) {
    return new BookEntity(new AggregateId(uuidv4()), new Date(), data.name, data.author, data.pagesCount);
  }
}
