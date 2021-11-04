import { AggregateRoot } from '@nestjs/cqrs';
import { IIdentifiableEntity } from '@rental-system/common';

export abstract class ItemEntity extends AggregateRoot implements IIdentifiableEntity<string> {
  constructor(public readonly id: string, public readonly createdAt: Date, public name: string, public author: string) {
    super();
  }
}
