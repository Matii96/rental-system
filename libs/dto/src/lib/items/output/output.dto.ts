import { IItem } from '@rental-system/domain';

export class ItemOutputDto {
  readonly id: string;
  readonly createdAt: Date;
  readonly name: string;
  readonly author: string;

  constructor(item: IItem) {
    this.id = item.id.toString();
    this.createdAt = item.createdAt;
    this.name = item.name;
    this.author = item.author;
  }
}
