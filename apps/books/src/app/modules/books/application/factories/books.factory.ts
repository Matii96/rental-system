import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { BookEntity } from '@rental-system/domain';
import { IEntityFactory } from '@rental-system/common';
import { BookInputDto } from '../../presentation/dto/input.dto';

@Injectable()
export class BooksFactory implements IEntityFactory<BookEntity> {
  create(data: BookInputDto) {
    return new BookEntity(uuidv4(), new Date(), data.name, data.author, data.pagesCount);
  }
}
