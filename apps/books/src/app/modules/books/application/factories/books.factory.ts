import { Injectable } from '@nestjs/common';
import { BookEntity } from '@rental-system/domain';
import { AggregateId, IEntityFactory } from '@rental-system/common';
import { BookInputDto } from '@rental-system/dto';

@Injectable()
export class BooksFactory implements IEntityFactory<BookEntity> {
  create(data: BookInputDto) {
    return new BookEntity(new AggregateId(), new Date(), data.name, data.author, data.pagesCount);
  }
}
