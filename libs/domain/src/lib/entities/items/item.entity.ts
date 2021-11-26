import { AggregateRoot } from '@nestjs/cqrs';
import { AggregateId, IIdentifiableEntity } from '@rental-system/common';

export abstract class ItemEntity extends AggregateRoot implements IIdentifiableEntity {
  constructor(
    public readonly id: AggregateId,
    public readonly createdAt: Date,
    public name: string,
    public author: string
  ) {
    super();
  }
}
