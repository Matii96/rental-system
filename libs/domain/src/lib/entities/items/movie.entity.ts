import { ItemEntity } from './item.entity';

export class MovieEntity extends ItemEntity {
  constructor(id: string, createdAt: Date, name: string, author: string, public length: number) {
    super(id, createdAt, name, author);
  }

  toString(): string {
    return `Movie id=${this.id}`;
  }
}
