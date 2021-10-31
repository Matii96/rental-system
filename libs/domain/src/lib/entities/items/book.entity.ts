import { ItemEntity } from './item.entity';

export class BookEntity extends ItemEntity {
  constructor(id: string, createdAt: Date, name: string, author: string, public pagesCount: number) {
    super(id, createdAt, name, author);
  }

  toString(): string {
    return `Book id=${this.id}`;
  }
}
